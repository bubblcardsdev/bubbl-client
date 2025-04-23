import React from "react";

const RefundPolicy = () => {
  return (
    <div className="bg-black text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-8">
      <h1 className="text-center text-2xl md:text-3xl font-semibold mb-8">
      Returns & Refunds Policy      </h1>
      <div className="max-w-5xl mx-auto flex flex-col gap-y-6 text-sm md:text-base leading-relaxed">
        <h3 className="text-lg font-semibold">INTRODUCTION</h3>
      <p>
        You are entitled to return your order within 3 days only if it is
        delivered damaged.
      </p>
      <p>
        The deadline for returning an order is 3 days from the date you
        received the order.
      </p>
      <p>
        In order to return the order, you must inform us of your decision by
        emailing us at <span>support@bubbl.cards</span>
      </p>
      <p>
        We will reimburse you no later than 30 days from the day on which we
        receive the returned goods. We will use the same means of payment as
        you used for the order, and you will not incur any fees for such
        reimbursement.
      </p>
      <h3 className="text-lg font-semibold">Conditions for returns:</h3>
      <p>
        In order for the goods to be eligible for a return, please make sure
        that:
      </p>
      <p>
        The goods were purchased in the last 3 days
      </p>
      <p>
        The goods are in the original packaging
      </p>
      <h3 className="text-lg font-semibold">Returning Goods:</h3>
      <p>
        We will be initiating the return process by sharing the shipment
        instructions with you over your registered email address.
      </p>
      <h3 className="text-lg font-semibold">Contact Us:</h3>
      <p>
        If you have any questions about our Returns and Refunds Policy, please
        contact us by <span>support@bubbl.cards</span> or call
        <span> +91 7845861552</span>
      </p>
    </div>
  </div>
  
  );
};

export default RefundPolicy;
