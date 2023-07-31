const TEST_CASES: { board: string[][], word: string }[] = [
    {
        board: [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]],
        word: "ABCCED"
    },
    {
        board: [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]],
        word: "SEE"
    },
    {
        board: [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]],
        word: "ABCB"
    },
    {
        "board": [
            [
                "A",
                "B",
                "C",
                "E"
            ],
            [
                "S",
                "F",
                "",
                "S"
            ],
            [
                "A",
                "D",
                "",
                "E"
            ],
            [
                "",
                "D",
                "",
                "E"
            ],
            [
                "A",
                "D",
                "X",
                "E"
            ]
        ],
        "word": "ASFDDDXEEESEC"
    }
]

export default TEST_CASES