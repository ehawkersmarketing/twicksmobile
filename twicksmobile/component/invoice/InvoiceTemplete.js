// invoiceTemplate.js
// import re
import './invoiceTemplete.css';
  
const generateInvoiceHTML = ({ item, userName, userEmail, userPhone, orderDate, Address, City, ZipCode, shipCharge, orderAmount}) => {
    // const {OrderId} = route.params;
  let html =  `
      <html>
        <head>
          <style>
            ${require('./invoiceTemplete.css')}
          </style>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous" ></script>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"/>
        </head>
        <body>
        <div className="invoice-main" ref={pdfRef}>
          <div className="invoice-header">
              <div className="title">
                  <h1>
                      <img src="" />
                  </h1>
              </div>
          </div>
        <div className="user-details row">
            <div class="section col-6">
                <div class="section-title">Buyer Information</div>
                <div class="details row">
                    <p>Name: ${userName}</p>
                    <p>Email: ${userEmail}</p>
                    <p>Phone: +91 ${userPhone}</p>
                </div>
            </div>
            <div class="section col-6">
                <div class="section-title">Invoice Details</div>
                <div class="details row">
                    <p>Date: {dayjs(orderDate).format('MMM D, YYYY')}</p>
                    <p>Invoice Number: {item?.transactionId}</p>
                </div>
            </div>
            <div class="section col-6">
                <div class="section-title">Billing To</div>
                <div class="details row">
                    <p>Address: ${Address}</p>
                    <p>City: ${City}</p>
                    <p>Pin: ${ZipCode}</p>
                </div>
            </div>
            <div class="section col-6">
                <div class="section-title">Shipping To</div>
                <div class="details row">
                    <p>Address: ${Address}</p>
                    <p>City: ${City}</p>
                    <p>Pin: ${ZipCode}</p>
                </div>
            </div>
            <div className="table-details">
                <table>
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price (INR)<p>(inclusive of taxes)</p></th>

                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        // let total = 0;
                //         products && products.map((item, index) => {
                //                 return (
                //                     <tr className="table-row" key={index}>
                //                         <td>{index + 1}</td>
                //                         <td>{item.productId?.title}</td>
                //                         <td>{item.units}</td>
                //                         <td>{(item.productId?.price)?.toLocaleString("en-IN")}</td>
                //                         <td>{(item.productId?.price * item?.units)?.toLocaleString("en-IN")}</td>
                //                     </tr>
                //                 );
                //             });
                //  html += 
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Shipment Charge</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>${shipCharge?.toLocaleString("en-IN")}</td>
                        </tr>
                        <tr>
                            <td>Total Gross</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>${(orderAmount + shipCharge)?.toLocaleString("en-IN")}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div class="section">
                <div class="section-bottom">Shipping From:</div>
                <div class="details row">
                    <p>
                        204, Princess Business SkyPark, Opp. Orbito Mall, A.B. Road,
                        Indore
                    </p>
                    <p>Phone: +91 81200 00506</p>
                    <p>Email: support@twicks.in</p>
                </div>
            </div>
        </div>
        <div className="download-button">
            <button class="btn btn-primary" onClick={downloadPDF}>
                Download
            </button>
        </div>
    </div>
      </body>
    </html>
 `;
 return html;
};
// export const fetchProducts = async () => {
//     try {
//        const response = await fetch('https://your-api-url.com/products');
//        const data = await response.json();
//        return data; // Assuming the API returns an array of products
//     } catch (error) {
//        console.error('Error fetching products:', error);
//        return [];
//     }
//    };
export default generateInvoiceHTML;
