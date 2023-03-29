const customerPlaceorderTemplate = (source) => {
  const id = source?.orderId;
  const date = source?.orderedAt;
  const name = source?.customer?.fullName;
  const address = source?.customer?.userAddress;
  const city = source?.customer?.userCity;
  const phone = source?.customer?.mobileNum;
  const email = source?.customer?.email;
  const totalAmount = source?.order?.priceDetails?.totalAmount;
  const discount = source?.order?.priceDetails?.bagDiscount;
  const deliveryCharge = source?.order?.priceDetails?.deliveryCharge;
  const subTotal = source?.order?.priceDetails?.subTotal;
  const items = source?.order?.products?.map((product) => {
    return `<tr  class="product">
    <td class="image-container"><img src="${product.images[0]}" alt=""></td>
    <td class="details-container">
        <div class="details-wrapper">
            <h4 class="name">${product.name.slice(0,30)}</h4>
            <h4 class="description">${product.description.slice(0,30)}</h4>
            <h4 class="quantity">x${product.quantity}</h4>
        </div>
    </td>
    <td class="price-container">
        <h3>Tk${product.price}</h3>
    </td>
</tr>`;
  }).join("");

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>customer order placed template</title>
      <style>
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
          font-family: sans-serif;
        }
        .header {
          width: 100%;
        }
        .header h1 {
          font-size: 1.4rem;
          color: #444;
          text-align: center;
          padding: 0.4rem;
        }
  
        .message-container {
          padding: 0.4rem;
        }
        .message-container .greetings {
          font-size: .875rem;
          text-transform: capitalize;
          color: #555;
          letter-spacing: 0.04rem;
        }
        .message-container .message {
          padding: 0.2rem;
          font-size: 0.675rem;
          text-transform: capitalize;
          letter-spacing: 0.04rem;
          color: #777;
        }
        .track-order-btn-container {
          text-align: center;
          padding: .4rem;
        }
        .track-order-btn-container button {
          border: none;
          outline: none;
        }
        .track-order-btn-container button a {
          padding: 0.5rem;
          text-decoration: none;
          color: white;
          background: #e50914;
          border: none;
          outline: none;
          text-transform: capitalize;
          font-weight: bold;
        }
      
        .delivery-details-container{
          padding: .4rem;
        }
        .delivery-details-container .heading{
          font-size: 1rem;
          text-transform: capitalize;
          color: #444;
        }
        
        .delivery-details-table{
            padding: .4rem;
          }
          .delivery-details-table .row{
              text-align: left;
              color: #777;
              text-transform: capitalize;
              font-size: .875rem;
          }
          .delivery-details-table .row th{
          width: 5rem;
      }
      
      /* order details  */
      .order-details-container{
          padding: .4rem;
      }
      .order-details-container .heading{
          font-size: 1rem;
          text-transform: capitalize;
          color: #444;
      }
      .order-details-container .order-id{
          margin-top: .4rem;
          margin-left: .2rem;
        font-size: .775rem;
        text-transform: capitalize;
        color: #777;
      }
      .order-details-container .order-id span{
        color: #555;
      }
        .order-details-table{
            margin-top: 1rem;
          }
        .order-details-table img{
            height: 5rem;
          }
  
        .order-details-container .product .details-container{
          width: 20rem;
          vertical-align: top;
        }
        .order-details-container .product .details-wrapper{
            color: #777;
            font-size: .875rem;
            text-transform: capitalize;
          }
          .order-details-container .product .details-wrapper .name{
              color: #555;
          }
        .order-details-container .product .details-wrapper .description{
            margin-top: .4rem;
            font-size: .675rem;
          }
          .order-details-container .product .details-wrapper .quantity{
              margin-top: 1.4rem;
          }
          .order-details-container .product .price-container{
            vertical-align: top;
            color: #555;
            font-size: .875rem;
            
          }
  
          /* price container  */
          .price-calculation-container{
              border-top: 1px solid rgba(0,0,0,0.1);
              padding: .5rem;
              text-transform: capitalize;
              color: #777;
              font-size: .775rem;
          }
          .price-table{
              padding: .2rem;
          }
          .price-table .header{
              text-align: left;
              width: 24rem;
              border: .2rem solid transparent
          }
          .price-table .currency{
              width: 12%;
              color: #777;
          }
          .price-table .line{
              border: none;
              border-top: 1px solid rgba(0,0,0,0.1);
          }
          .price-table .subtotal{
              color: #333;
          }
  
          
      </style>
    </head>
  
    <body>
      <header class="header">
        <h1>RamzanStore</h1>
      </header>
      <section class="message-container">
        <h2 class="greetings">assalamualaykum ${name}!</h2>
        <p class="message">
          jazakumullahum khairan for place an order. please wait for confirmation.
          we will contact with you as soon as possible. inshaAllah!
        </p>
      </section>
      <div class="track-order-btn-container">
        <button><a href="#">track order</a></button>
      </div>
      <section class="delivery-details-container">
          <h2 class="heading">delivery details</h2>
          <table class="delivery-details-table">
              <tbody>
                  <tr>
                      <tr  class="row">
                          <th>name</th>
                          <td>${name}</td>
                      </tr>
                      <tr  class="row">
                          <th>address</th>
                          <td>${address + ", " + city }</td>
                      </tr>
                      <tr  class="row">
                          <th>phone</th>
                          <td><a href="tel:+880${phone}">0${phone}</a></td>
                      </tr>
                      <tr  class="row">
                          <th>email</th>
                          <td><a href="mailto:${email}">${email}</a></td>
                      </tr>
                  </tr>
              </tbody>
          </table>
      </section>
      <section class="order-details-container">
          <h2 class="heading">order details</h2>
          <p class="order-id">date - <span>${date}</span></p>
          <p class="order-id">order id - <span>${id}</span></p>
          <table class="order-details-table">
              <tbody>
                  <tr>
                  ${items}
                  </tr>
              </tbody>
          </table>
      </section>
      <section class="price-calculation-container">
          <table class="price-table">
              <tbody>
                  <tr>
                      <th class="header">
                          total amount
                      </th>
                      <td class="currency">
                          tk
                      </td>
                      <td>
                          ${totalAmount}
                      </td>
                  </tr>
                  <tr>
                      <th class="header">
                          discount
                      </th>
                      <td class="currency">
                          tk
                      </td>
                      <td>
                          ${discount}
                      </td>
                  </tr>
                  <tr>
                      <th class="header">
                          delivery charge
                      </th>
                      <td class="currency">
                          tk
                      </td>
                      <td>
                          ${deliveryCharge}
                      </td>
                  </tr>
                  <tr>
                      <td colspan="3"><hr class="line"/></td>
                  </tr>
                  <tr class="subtotal">
                      <th class="header">
                          subtotal
                      </th>
                      <td class="currency">
                          tk
                      </td>
                      <td>
                          ${subTotal}
                      </td>
              </tr>
              </tbody>
          </table>
      </section>
    </body>
  </html>
  `
};

export { customerPlaceorderTemplate };
