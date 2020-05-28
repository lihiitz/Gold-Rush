class Renderer {



    renderBoard(matrix) {
        $(`.container`).empty()
        const source = $(`#container-template`).html()
        const template = Handlebars.compile(source)
        for (let i = 0; i < matrix.length; i++) {
            const newHtml = template({ rowNum: i, item: matrix[i] })
            $(`.container`).append(newHtml)
        }
    }
}