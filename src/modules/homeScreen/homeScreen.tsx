import { View } from 'react-native'
import React from 'react'
import { Button } from '@common'
import { styles } from './styles'
import { FIREBASE_COLLECTION, SCREEN } from '@enums'
import { BaseService } from '../../DatabaseServices/BaseService'

const dummyProduct = {
    name: 'Rio',
    category: 'Biscuit',
    cost: 25,
    sellingPrice: 40,
}

const HomeScreen = ({ navigation }) => {
    const productService = new BaseService(FIREBASE_COLLECTION.PRODUCTS)

    const registerUser = async () => {

        navigation.navigate(SCREEN.SIGNUP)
    }

    const loginUser = async () => {
        navigation.navigate(SCREEN.LOGIN)
    }

    const createProduct = async () => {
        await productService.create(dummyProduct)
        alert('Product created')
    }

    const updateProduct = async () => {
        await productService.update('testId', dummyProduct)
        alert('Product updated')
    }

    const deleteProduct = async () => {
        await productService.delete('testId')
        alert('Product deleted')
    }

    const getProducts = async () => {
        const allProducts = await productService.list()
        console.log(allProducts)
    }

    return (
        <View style={styles.mainScreen}>

            <Button text='Register user' onPress={() => registerUser()} />
            <Button text='Login user' onPress={() => loginUser()} />

            <Button text='Create Product' onPress={() => createProduct()} />
            <Button text='Update Product' onPress={() => updateProduct()} />
            <Button text='Delete Product' onPress={() => deleteProduct()} />
            <Button text='Get Products' onPress={() => getProducts()} />
        </View>
    )
}

export default HomeScreen
