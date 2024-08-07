const User = require("../models/userModel.js");
const Cart = require("../models/cartModel.js");
const mongoose = require('mongoose');
require('dotenv').config();

const db = require('../config/db.js');
db()


let jwtToken; // Make sure jwtToken is defined in the correct scope

const testNewUserData = {
    username: "testUsername",
    password: "testPassword",
}

const testNewItem = {id:'66ae490625d36af8f8a9c83d'}

afterAll(async () => {
  await mongoose.disconnect();
})


describe('Product routes', () => {
    let data = []
    const expectedKeys = [
        "_id",
        "id",
        "price",
        "title",
        "description",
        "image",
        "category",
    ].sort()

    // test get all products routes
    it('Check if array of objects return intended properties', async () => {
        const res = await fetch(`http://localhost:3030/api/products`)
        data = await res.json()
        // console.log('test',data)
        const dataKeys = Object.keys(data[0]).sort();
        expect(dataKeys).toEqual(expectedKeys);
    });

    // test get one product route
    it('Check if one product return object matches expected properties', async () => {
        const res = await fetch(`http://localhost:3030/api/products/${data[0]._id}`)
        const dataOneProduct = await res.json()
        // console.log('test',data)
        const dataKeys = Object.keys(dataOneProduct).sort();
        expect(dataKeys).toEqual(expectedKeys);
    });
})


// User auth testing
describe('User auth routes', () => {

    // test user signup
    it('Check user created and data returned', async () => {
        const res = await fetch(`http://localhost:3030/api/auth/register` , {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testNewUserData),
        });
        const data = await res.json()

        jwtToken = data.jwtToken

        console.log(data)
        expect(data)
    })

    // test user login
    it('Check user signin works and data returned', async () => {
        const res = await fetch(`http://localhost:3030/api/auth/login` , {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testNewUserData),
        });
        const data = await res.json()
        // console.log(data)
        expect(data)
    })
})


// Cart testing

describe('Cart routes testing', () => {


    it('Cart created', async () => {
        const resCart = await fetch(`http://localhost:3030/api/cart`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${jwtToken}` },
        });
        // console.log(resCart)
        const dataCart = await resCart.json()
        console.log('CARTDATA',dataCart)
        expect(dataCart)
        
    })

    // addCart
    it('Add an item to users cart', async () => {
        // console.log('token',  jwtToken)
        const res = await fetch(`http://localhost:3030/api/cart/add`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testNewItem),
            });
        
            const dataCart = await res.json()
        console.log('ADDED ITEM', dataCart)
        expect(dataCart)

    })

    // orderCart
    it('Order and clear cart', async () => {
        const res = await fetch(`http://localhost:3030/api/cart/order`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([]),
        });
        const dataCart = await res.json()
        console.log('ORDER CLEAR', dataCart)
        expect(dataCart)
    })

    
})

describe('Cleanup operations', () => {
    it('Deletes the user\'s cart', async () => {
      if (jwtToken) {
        // Delete the new user's cart
        const cartDeletedRes = await fetch(`http://localhost:3030/api/cart/delete`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        });
  
        const cartDeleted = await cartDeletedRes.json();
        console.log('DELETED CART', cartDeleted);
  
        // Check if the cart was deleted
        try {
          const foundCart = await Cart.findOne({ _id: cartDeleted._id });
          expect(foundCart).toBeNull(); // Expect the cart to be null (deleted)
          console.log('Cart successfully deleted');
        } catch (err) {
          console.error('Error finding cart:', err);
          throw err; // This will fail the test if the cart is found
        }
      }
    }, 15000);
  
    it('Deletes the user', async () => {
      if (jwtToken) {
        const userDeletedRes = await fetch(`http://localhost:3030/api/auth/delete`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        });
  
        const userDeleted = await userDeletedRes.json();
        console.log('DELETED USER', userDeleted);
  
        // Check if the user was deleted
        try {
          const foundUser = await User.findOne({ _id: userDeleted._id });
          expect(foundUser).toBeNull(); // Expect the user to be null (deleted)
          console.log('User successfully deleted');
        } catch (err) {
          console.error('Error finding user:', err);
          throw err; // This will fail the test if the user is found
        }
      }
    }, 15000);

  });



   

