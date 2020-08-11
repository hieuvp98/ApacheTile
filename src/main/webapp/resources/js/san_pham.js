let products = [];

products.push({
    name: "Iphone",
    price: 50000,
    quantity: 10
})
products.push({
    name: "Dell xps",
    price: 70000,
    quantity: 5
})
products.push({
    name: "MacBook",
    price: 90000,
    quantity: 70
})
let content = '';
for(let i = 0; i < products.length; i++){
    console.log(i)
    let product = products[i];
   content += `<tr>
                <td>${i + 1}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.quantity}</td>
            </tr>`;
   $('#table-content').html(content);
}

