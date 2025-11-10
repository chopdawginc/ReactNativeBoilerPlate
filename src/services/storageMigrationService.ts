import AsyncStorage from '@react-native-async-storage/async-storage';
import { mmkvService } from './mmkvService';
import { KEYS } from '@constant';

const MIGRATION_FLAG = '@mmkv_migration_complete';

class StorageMigrationService {
  /**
   * Check if migration has been completed
   */
  isMigrationComplete(): boolean {
    return mmkvService.contains(MIGRATION_FLAG);
  }

  /**
   * Migrate data from AsyncStorage to MMKV
   */
  async migrateData(): Promise<void> {
    if (this.isMigrationComplete()) {
      console.log('MMKV: Migration already completed');
      return;
    }

    try {
      console.log('MMKV: Starting data migration from AsyncStorage...');
      
      // Get all keys from AsyncStorage
      const allKeys = await AsyncStorage.getAllKeys();
      
      if (allKeys.length === 0) {
        console.log('MMKV: No data to migrate');
        mmkvService.setItem(MIGRATION_FLAG, true);
        return;
      }

      // Migrate each key
      for (const key of allKeys) {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value !== null) {
            // Parse and re-save to MMKV
            const parsedValue = JSON.parse(value);
            mmkvService.setItem(key, parsedValue);
            console.log(`MMKV: Migrated key "${key}"`);
          }
        } catch (error) {
          console.error(`MMKV: Failed to migrate key "${key}":`, error);
        }
      }

      // Mark migration as complete
      mmkvService.setItem(MIGRATION_FLAG, true);
      
      console.log('MMKV: Migration completed successfully');
      
      // Optional: Clear AsyncStorage after successful migration
      // Uncomment after verifying everything works:
      // await AsyncStorage.clear();
      // console.log('MMKV: AsyncStorage cleared');
      
    } catch (error) {
      console.error('MMKV: Migration failed:', error);
      throw error;
    }
  }
}

export const storageMigrationService = new StorageMigrationService();

