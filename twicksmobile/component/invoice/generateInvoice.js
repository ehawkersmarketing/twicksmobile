// App.js

import React, { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import generateInvoiceHTML from './invoiceTemplate';

const App = () => {
 const [pdfPath, setPdfPath] = useState('');
 const [invoiceDetails, setInvoiceDetails] = useState(null);

 // Example invoice ID
 const {id} = route.params; // Replace this with the actual ID you want to fetch

 const fetchInvoiceDetails = async (id) => {
    try {
      // Replace this URL with your actual API endpoint, including the ID as a query parameter
      const response = await fetch(`https://backend.twicks.in/api/getOrderById/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching invoice details:', error);
      return null;
    }
 };

 useEffect(() => {
    const fetchData = async () => {
      const details = await fetchInvoiceDetails(id);
      setInvoiceDetails(details);
    };

    fetchData();
 }, [id]);

 const generateInvoice = async () => {
    if (!invoiceDetails) return;

    const htmlContent = generateInvoiceHTML(invoiceDetails);

    const options = {
      html: htmlContent,
      fileName: 'invoice',
      directory: 'Documents',
    };

    const file = await RNHTMLtoPDF.convert(options);
    setPdfPath(file.filePath);
 };

 return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Generate Invoice PDF" onPress={generateInvoice} disabled={!invoiceDetails} />
      {pdfPath && <Text>PDF Generated at: {pdfPath}</Text>}
    </View>
 );
};

export default App;
