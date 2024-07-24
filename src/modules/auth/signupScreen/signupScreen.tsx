import { View } from 'react-native'
import React from 'react'
import { Button } from '@common'
import { styles } from './styles'
import { FIREBASE_COLLECTION } from '@enums'
import { AuthService } from '../../../AppServices/AuthService'
import { BaseService } from '../../../DatabaseServices/BaseService'

const dummyProduct = {
  name: 'Rio',
  category: 'Biscuit',
  cost: 25,
  sellingPrice: 40,
}

const SignupScreen = () => {
  const auth = new AuthService()
  const productService = new BaseService(FIREBASE_COLLECTION.PRODUCTS)

  const registerUser = async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john2.doe@example.com',
      age: 22,
      password: 'Hamza123@',
    }
    const createdUser = await auth.register(newUser)
    console.log(createdUser)
  }

  const loginUser = async () => {
    const user = await auth.login('john2.doe@example.com', 'Hamza123@')
    console.log(user)
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

export default SignupScreen
