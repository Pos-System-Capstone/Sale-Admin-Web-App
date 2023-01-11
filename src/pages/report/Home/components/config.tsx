const trends = [
  {
    title: 'Gross sales',
    dataIndex: 'gross_sales',
    valueType: 'money',
    highlight: true
  },
  {
    title: 'Total customers',
    dataIndex: 'total_customers'
  },
  {
    title: 'Driver waiting time',
    dataIndex: 'total_transaction',
    highlight: true
  },
  {
    title: 'Average transaction amount',
    dataIndex: 'average_transaction_amount',
    valueType: 'money'
  },
  {
    title: 'Net sales from offers',
    dataIndex: 'net_sales',
    valueType: 'money',
    highlight: true
  }
];

const allHomeData = {
  trends
};

export default allHomeData;
