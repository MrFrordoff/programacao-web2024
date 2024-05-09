
function transporMatriz(A) {
    
    function imprimirMatriz(matriz) {
        for (let i = 0; i < matriz.length; i++) {
            console.log(matriz[i].join("\t"));
        }
        console.log(); 
    }

    
    console.log("Matriz original:");
    imprimirMatriz(A);

    
    const transposta = [];

    
    for (let i = 0; i < A[0].length; i++) {
        transposta.push([]);
    }

    
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[i].length; j++) {
            transposta[j].push(A[i][j]);
        }
    }

   
    console.log("Matriz transposta:");
    imprimirMatriz(transposta);
}


const matrizOriginal = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

transporMatriz(matrizOriginal);
