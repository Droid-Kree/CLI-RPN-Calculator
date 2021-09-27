const SUPPORTED_OPERATIONS = ['+', '-', '*', '/']

let stack = []

function getTotalRPNResult(line) {

    const isValidInput = validateInput(line)

    if (!isValidInput) {
        return `Please enter a valid RPN operation.`
    }

    const total = calculateTotal(parseInput(line))

    if (Number.isNaN(total)) {
        return `Not a valid operation.`
    }

    return total
}

function parseInput(line) {
    return line
        .trim()
        .split(' ')
        .filter(value => value !== '')
}

function calculateTotal(input) {
    input.forEach((value) => {
        performRPNOperations(value)
    })

    const result = stack[stack.length - 1]
    return result
}

function performRPNOperations(value) {
    if (isSupportedOperation(value)) {
        const operationResult = performOperation(value, stack[stack.length - 2], stack[stack.length - 1])
        stack.splice(stack.length - 2, 3, operationResult)
    } else {
        stack = [...stack, value]
    }
}

function isSupportedOperation(operation) {
    return SUPPORTED_OPERATIONS.includes(operation)
}

function validateInput(input) {

    if (!input) {
        return false
    }

    const allCharactersAllowed = parseInput(input)
        .every((value) => (value * 1) || isSupportedOperation(value))

    if (!allCharactersAllowed) {
        return false
    }

    return true
}

function performOperation(operation, firstOperand, secondOperand) {

    const operandOne = parseFloat(firstOperand)
    const operandTwo = parseFloat(secondOperand)

    return {
        '+': operandOne + operandTwo,
        '-': operandOne - operandTwo,
        '*': operandOne * operandTwo,
        '/': operandOne / operandTwo
    }[operation]
}

module.exports = { getTotalRPNResult }