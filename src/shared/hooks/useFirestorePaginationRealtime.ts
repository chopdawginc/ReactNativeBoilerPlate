import {useState, useEffect, useCallback, useRef} from 'react';
import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

interface UseFirestorePaginationRealtimeProps<T extends FirebaseFirestoreTypes.DocumentData> {
  query: FirebaseFirestoreTypes.Query<T>;
  pageSize: number;
  referenceFields?: string[];
  transformDataParams?: any;
  transformData?: (
    item: T,
    referenceFields: string[],
    setRelatedListener: SetRelatedListener,
    transformDataParams?: any,
  ) => Promise<T>;
}

type SetRelatedListener = <T extends FirebaseFirestoreTypes.DocumentData>(
  id: string,
  ref: FirebaseFirestoreTypes.DocumentReference<T>,
) => void;

export interface UseFirestorePaginationRealtimeReturn<T extends FirebaseFirestoreTypes.DocumentData> {
  data: T[];
  loading: boolean;
  error: Error | null;
  loadMore: () => void;
  refetch: () => void;
  hasMore: boolean;
}

const useFirestorePaginationRealtime = <T extends FirebaseFirestoreTypes.DocumentData>({
  query,
  pageSize,
  referenceFields = [],
  transformData,
  transformDataParams,
}: UseFirestorePaginationRealtimeProps<T>): UseFirestorePaginationRealtimeReturn<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const lastVisibleRef = useRef<FirebaseFirestoreTypes.DocumentSnapshot<T> | null>(null);
  const relatedListeners = useRef<Record<string, () => void>>({});
  const referenceFieldsRef = useRef<string[]>(referenceFields);

  const setRelatedListener: SetRelatedListener = useCallback((id, ref) => {
    if (relatedListeners.current[id]) return;

    const unsubscribe = ref.onSnapshot(
      relatedSnapshot => {
        if (relatedSnapshot.exists()) {
          setData(prev =>
            prev.map(item => {
              const updated = {...item} as any;
              for (const field of referenceFieldsRef.current) {
                if ((item as any)[field]?.id === id) {
                  updated[`${field}Data`] = relatedSnapshot.data();
                }
              }
              return updated;
            }),
          );
        }
      },
      err => {
        console.error(`Error listening to related doc ${id}:`, err);
      },
    );

    relatedListeners.current[id] = unsubscribe;
  }, []);

  const cleanupListeners = useCallback(() => {
    Object.values(relatedListeners.current).forEach(unsub => unsub());
    relatedListeners.current = {};
  }, []);

  const fetchData = useCallback(
    async (isLoadMore = false) => {
      setLoading(true);
      try {
        let q = query.limit(pageSize);
        if (isLoadMore && lastVisibleRef.current) {
          q = query.startAfter(lastVisibleRef.current).limit(pageSize);
        }

        const unsubscribe = q.onSnapshot(
          async snapshot => {
            if (!snapshot.empty) {
              const newItems = await Promise.all(
                snapshot.docs.map(async docSnap => {
                  let item = docSnap.data() as T;
                  if (transformData) {
                    item = await transformData(
                      item,
                      referenceFieldsRef.current,
                      setRelatedListener,
                      transformDataParams,
                    );
                  }
                  return item;
                }),
              );

              setData(prev => (isLoadMore ? [...prev, ...newItems] : newItems));
              lastVisibleRef.current = snapshot.docs[snapshot.docs.length - 1];
              setHasMore(snapshot.size >= pageSize);
            } else {
              if (!isLoadMore) setData([]);
              setHasMore(false);
            }
            setLoading(false);
          },
          (err: Error) => {
            setLoading(false);
            setError(err);
          },
        );

        return unsubscribe;
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    },
    [query, pageSize, transformData, transformDataParams, setRelatedListener],
  );

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    (async () => {
      const unsub = await fetchData();
      if (unsub) unsubscribe = unsub;
    })();
    return () => {
      if (unsubscribe) unsubscribe();
      cleanupListeners();
    };
  }, [fetchData, cleanupListeners]);

  const loadMore = useCallback(() => {
    if (hasMore) fetchData(true);
  }, [hasMore, fetchData]);

  const refetch = useCallback(() => {
    setData([]);
    lastVisibleRef.current = null;
    setHasMore(true);
    setError(null);
    cleanupListeners();
    fetchData();
  }, [cleanupListeners, fetchData]);

  return {
    data,
    loading,
    error,
    loadMore,
    refetch,
    hasMore,
  };
};

export default useFirestorePaginationRealtime;
