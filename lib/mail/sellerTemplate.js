const sellerTemplate = (order) => {
    const id = order?.orderId
    const date = order?.orderedAt
  const name = order?.customer?.fullName;
  const phone = order?.customer?.mobileNum;
  const email = order?.customer?.email;
  const totalAmount  = order?.order?.priceDetails?.totalAmount
  const deliveryCharge = order?.order?.priceDetails?.deliveryCharge
  const subTotal = order?.order?.priceDetails?.subTotal
  const items = order?.order?.products?.map((product, index) => {
    return `<tr>
    <td>${product.name.slice(0,24)}</td>
    <td class="quantity">${product.quantity}</td>
    <td class="price">$${product.price}</td>
  </tr>`;
  });

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>testing</title>
      <script src="app.js" defer></script>
      <!-- style -->
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: sans-serif;
          color: #444;
          text-transform: capitalize;
        }
        a {
          text-decoration: none;
        }
  
        .header {
          text-align: center;
          font-size: 1.5rem;
          padding: 1rem;
          letter-spacing: 0.1rem;
          color: #e509149f;
        }
        .container {
          padding: 1rem;
        }
        .container .header {
          text-align: left;
          font-size: 1rem;
        }
        .container .body {
          padding-top: 1rem;
          padding-left: 3rem;
        }
  
        /* table styles */
        .product-table th {
          padding: 0.5rem;
          padding-left: 1rem;
          font-size: 1.2rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        }
        .product-price-table th {
          padding: 0.5rem;
          padding-left: 1rem;
          font-size: 1rem;
        }
  
        .product-table td,
        .product-table th {
          text-align: left;
          color: #666;
        }
        .product-price-table td,
        .product-price-table th {
          text-align: left;
          color: #666;
        }
  
        .product-table td {
          padding: 1rem;
          min-width: 10rem;
        }
        .product-price-table td {
          padding-left: 1rem;
          min-width: 10rem;
          color: #e50914
        }
        .product-table .quantity,
        .product-table .price {
          text-align: center;
        }
        .product-price-table .delivery,
        .product-price-table .subtotal {
          text-align: center;
        }
        
        .customer-table td,
        .customer-table th,
        .order-table td,
        .order-table th {
          text-align: left;
          padding-left: 0.5rem;
        }
        .customer-table th,
        .order-table th {
          border-left: 6px solid #e50914;
          min-width: 4rem;
        }
        .customer-table td,
        .order-table td {
          padding: 0.5rem;
          padding-left: 2rem;
        }
  
        /* button */
        button {
          position: absolute;
          left: 50%;
          transform: translate(-50%);
          padding: 0.8rem;
          background: #e50914;
          border: none;
          outline: none;
          letter-spacing: 0.02rem;
          cursor: pointer;
        }
        button a {
          color: white;
          font-size: 1rem;
          font-weight: bold;
          text-transform: capitalize;
        }
        button:hover {
          filter: brightness(85%);
        }
        button:active {
          background: white;
          border: 1px solid #e50914;
          color: #e50914;
        }
      </style>
    </head>
  
    <body>
      <!-- header  -->
      <h1 class="header">Alahamdulillah! new order arrived.</h1>
  
      <!-- order details  -->
      <div class="container">
        <h2 class="header">order -</h2>
        <div class="body">
          <table class="order-table">
            <tbody>
              <tr>
                <th>date</th>
                <td>${date}</td>
              </tr>
              <tr>
                <th>id</th>
                <td>${id}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- products list  -->
      <div class="container">
        <h2 class="header">products -</h2>
        <div class="body">
          <table class="product-table">
            <thead>
              <th>name</th>
              <th class="quantity">quantity</th>
              <th class="price">price</th>
            </thead>
            <tbody>
              ${items}
            </tbody>
          </table>
          <table class="product-price-table">
            <thead>
              <th>total amount</th>
              <th class="delivery">delivery charge</th>
              <th class="subtotal">subtotal</th>
            </thead>
            <tbody>
              <tr>
                <td>$${totalAmount}</td>
                <td class="delivery">$${deliveryCharge}</td>
                <td class="subtotal">$${subTotal}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- customer details  -->
      <div class="container">
        <h2 class="header">customer -</h2>
        <div class="body">
          <table class="customer-table">
            <tbody>
              <tr>
                <th>name</th>
                <td>${name}</td>
              </tr>
              <tr>
                <th>phone</th>
                <td><a href="tel:+88${phone}">${phone}</a></td>
              </tr>
              <tr>
                <th>email</th>
                <td><a href="mailto:${email}">${email}</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="container">
        <button><a href="#">go to dashboard</a></button>
      </div>
    </body>
  </html>
  `
};

export { sellerTemplate };
