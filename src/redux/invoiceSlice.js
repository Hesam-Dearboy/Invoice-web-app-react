import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { useState } from "react";
import data from "../assets/data/data.json";
import getForwardDate from "../functions/forwardDate";
import generateID from "../functions/generateId";


const today = moment().format('YYYY-MM-DD')



const invoiceSlice = createSlice({
  name: "invoces",

  initialState: {
    allInvoice: data,
    filteredInvoice: [],
  },

  reducers: {
    filterInvoice: (state, action) => {
      const { allInvoice } = state;
      if (action.payload.status === "") {
        state.filteredInvoice = allInvoice;
      } else {
        const filteredData = allInvoice.filter((invoice) => {
          return invoice.status === action.payload.status;
        });
        console.log(filteredData)
        state.filteredInvoice = filteredData;
      }
    },
    addInvoice: (state, action) => {
      const {
        description,
        paymentTerms,
        clientName,
        clientEmail,
        senderStreet,
        senderCity,
        senderPostCode,
        senderCountry,
        clientStreet,
        clientCity,
        clientPostCode,
        clientCountry,
        item,
      } = action.payload;

      const finalData = {
        id: generateID(),
        createdAt: today,
        paymentDue: getForwardDate(paymentTerms),
        description: description,
        paymentTerms: paymentTerms,
        clientName: clientName,
        clientEmail: clientEmail,
        status: "pending",
        senderAddress: {
          street: senderStreet,
          city: senderCity,
          postCode: senderPostCode,
          country: senderCountry,
        },
        clientAddress: {
          street: clientStreet,
          city: clientCity,
          postCode: clientPostCode,
          country: clientCountry,
        },
        items: item,
        total: item.reduce((acc, i) => {
          return acc + i.total;
        }, 0),
      };
      state.allInvoice.push(finalData);
    },
  },
});

export default invoiceSlice;
