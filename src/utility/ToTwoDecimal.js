
function ToTwoDecimal(valueGet) {
  return (Math.round(valueGet * 100) / 100).toFixed(2);
}
export default ToTwoDecimal