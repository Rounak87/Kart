import emailjs from '@emailjs/browser';

const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

export const sendOrderConfirmationEmail = async (orderData) => {
  try {
    const templateParams = {
      to_email: orderData.email,
      to_name: orderData.name,
      order_id: orderData.id,
      order_total: `₹${orderData.total}`,
      order_date: new Date(orderData.timestamp).toLocaleDateString('en-IN'),
      items_list: orderData.items
        .map(item => `${item.name} x ${item.qty} - ₹${(item.price * item.qty).toFixed(2)}`)
        .join('\n'),
      items_count: orderData.items.length,
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.log('Email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
};
