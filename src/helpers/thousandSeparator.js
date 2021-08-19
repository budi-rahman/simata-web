function thousandSeparator(x) {
  return !!x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
}
export default thousandSeparator;
