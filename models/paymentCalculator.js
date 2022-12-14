function calculatePayment(data){
    return data.Weight*10/100+data.Height*data.Width*data.Length*10/100+data.Value*20/100;
}
function calculateDeliveryFee(data){
    return data.Weight*10/100+data.Height*data.Width*data.Length*10/100;
}
function calculateInsuranceAmount(data){
    return data.Value*20/100;
}

module.exports = {calculatePayment, calculateDeliveryFee, calculateInsuranceAmount}