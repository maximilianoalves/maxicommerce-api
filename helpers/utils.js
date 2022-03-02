exports.roundedValues = (num) => {
    return Math.round(num * 100) / 100
}

exports.formmatValues = (num) => {
    return Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(num)
}