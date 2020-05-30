class Renderer {
    renderBoard(matrix) {
        $(`#board`).empty()
        const source = $(`#board-template`).html()
        const template = Handlebars.compile(source)
        matrix.forEach(element => {
            const newHtml = template({ item: element })
            $(`#board`).append(newHtml)
        })
    }
    renderScore(score1, score2) {
        $(`#score`).empty()
        const source = $(`#score-template`).html()
        const template = Handlebars.compile(source)
        const newHtml = template({ score1, score2 })
        $(`#score`).append(newHtml)
    }
}