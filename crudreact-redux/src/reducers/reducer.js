export const reducer = (state, action) => {
    var list = JSON.parse(localStorage.getItem('data'))

    switch (action.type) {
        case "INSERT":
            list.push(action.payload)
            localStorage.setItem('data', JSON.stringify(list))
            return { list, currentIndex: -1 }
        case "UPDATE":
            list[state.currentIndex] = action.payload
            localStorage.setItem('data', JSON.stringify(list))
            return { list, currentIndex: -1 }
        case "DELETE":
            list.splice(action.payload, 1)
            localStorage.setItem('data', JSON.stringify(list))
            return { list, currentIndex: -1 }
        case "UPDATE-INDEX":
            return { list, currentIndex: action.payload }
        default:
            return state;
    }
}
