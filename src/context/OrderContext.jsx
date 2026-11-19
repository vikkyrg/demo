import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

const INITIAL_ORDERS = [
  {
    orderId: "BM-BLR-84920",
    date: "19 Nov 2026, 11:42 AM",
    stagingYard: "Prestige Falcon City Phase 2 - Tower 4 Staging Yard",
    siteEngineer: "Rajesh Kumar (Chief Site Engineer)",
    phone: "+91 98450 12890",
    status: "EN_ROUTE", // CONFIRMED, LOADED, EN_ROUTE, DELIVERED
    statusLabel: "In-Transit • Hydraulic Crane Vehicle",
    etaMinutes: 28,
    carrierName: "Jobsite Express Haulage",
    vehicleNumber: "KA-04-E-8821",
    driverName: "Manjunath Gowda",
    driverPhone: "+91 98452 77112",
    unloadingMethod: "Hydraulic Crane Offloading",
    paymentMethod: "30-Day B2B Trade Credit (Approved)",
    gstin: "29AABCB1234F1Z8",
    items: [
      {
        id: "ultratech-ppc-50kg",
        name: "UltraTech PPC Cement 50kg Bag",
        sku: "SKU: UT-PPC-50",
        price: 385,
        quantity: 40,
        unit: "Bags",
        weightKg: 2000,
        stagingYard: "Tower 4 Staging Yard B"
      },
      {
        id: "tata-tiscon-550d-12mm",
        name: "Tata Tiscon 550D TMT Bar 12mm",
        sku: "SKU: TT-550D-12",
        price: 68500,
        quantity: 1,
        unit: "MT",
        weightKg: 1000,
        stagingYard: "Tower 4 Staging Yard B"
      },
      {
        id: "dr-fixit-pdifin-2k-12kg",
        name: "Dr. Fixit Pdifin 2K Coating 12kg",
        sku: "SKU: DF-PDF2K-12",
        price: 1890,
        quantity: 4,
        unit: "Kits",
        weightKg: 48,
        stagingYard: "Tower 4 Staging Yard B"
      }
    ],
    totalAmount: 99460,
    gstAmount: 15172,
    grandTotal: 114632
  }
];

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('buildmart_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [currentOrder, setCurrentOrder] = useState(() => {
    return orders[0] || null;
  });

  useEffect(() => {
    try {
      localStorage.setItem('buildmart_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const placeOrder = (orderDetails) => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrderId = `BM-BLR-${randomNum}`;
    const now = new Date();
    const formattedDate = `${now.getDate()} Nov ${now.getFullYear()}, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newOrder = {
      orderId: newOrderId,
      date: formattedDate,
      stagingYard: orderDetails.stagingYard || "Prestige Falcon City Phase 2 - Tower 4 Staging Yard",
      siteEngineer: orderDetails.siteEngineer || "Rajesh Kumar (Site Engineer)",
      phone: orderDetails.phone || "+91 98450 12890",
      status: "CONFIRMED",
      statusLabel: "Order Confirmed & Material Allocated",
      etaMinutes: 45,
      carrierName: "BuildMart Heavy Logistics Fleet",
      vehicleNumber: "KA-04-E-8821",
      driverName: "Manjunath Gowda",
      driverPhone: "+91 98452 77112",
      unloadingMethod: orderDetails.unloadingMethod || "Hydraulic Crane Offloading",
      paymentMethod: orderDetails.paymentMethod || "30-Day B2B Trade Credit",
      gstin: orderDetails.gstin || "29AABCB1234F1Z8",
      items: orderDetails.items || [],
      totalAmount: orderDetails.totalAmount || 0,
      gstAmount: orderDetails.gstAmount || 0,
      grandTotal: orderDetails.grandTotal || 0
    };

    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    return newOrder;
  };

  const getOrderById = (id) => {
    return orders.find(o => o.orderId === id) || orders[0];
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        currentOrder,
        setCurrentOrder,
        placeOrder,
        getOrderById
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
export default OrderContext;
