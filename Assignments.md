// Todos
// Admin side
// 1 users > view, edit and delete (dont include password one edit)
// 2 admins > view 
// 3 my account
// 4 logout
// 5 style the error message p tag o product details, make it red in color and add a font size of 12 px.
// on hme page make the height of the product images to be the same.
// 6 on lgin page add statement 'Dont have an acoount?Register' Make the word register a link that will take you to register page.

### Client side
1. add to cart
2. view our cart
3. delete from cart
4. clear cart
5. select pickuppoint
6. Recrd sale
7. Filter by category



const cart = req.user.cart;
        let products = [];
        for(let i = 0; i < cart.length; i++){
            let product = await productModel.findOne({_id: cart[i].productId})
            products = [...products, {product: product, quantity: cart[i].quantity}]
        }
        res.send({
            message: 'Fetched cart successfully',
            data: products
        });

            // const cart = req.user.cart;
    // let products = [];

    // for (let i = 0; i <  cart.length; i++) {
    //     console.log(cart[i].productId)
    //   let product = await productModel.findOne({ _id: cart[i].productId });
    //   console.log(product)
    //   products = [
    //     ...products,
    //     { product: product, quantity: cart[i].quantity },
    //   ];
    // }
    // res.send({
    //   message: "Fetched cart Properly",
    //   data: products,
    //   cart: cart,
    // });