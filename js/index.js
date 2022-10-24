function addCards(produtos){
    const vitrine       = document.getElementById('vitrine')
    const ulVitrine     = document.createElement('ul')
    const btnTodos      = document.getElementById('btnTodos')
    const btnChaveiros  = document.getElementById('btnChaveiros')
    const btnCaixas     = document.getElementById('btnCaixas')
    const btnEsculturas = document.getElementById('btnEsculturas')
    const btnPesquisar  = document.getElementById('btnPesquisar')

  
    produtos.forEach(produto => {
        let card = criarCards(produto)
        ulVitrine.appendChild(card)
    });
    
    btnTodos.addEventListener('click',()=>{
        while (ulVitrine.firstChild) {
            ulVitrine.removeChild(ulVitrine.firstChild);
          }
        
        produtos.forEach(produto => {
            let card = criarCards(produto)
            ulVitrine.appendChild(card)
        });
    }) 
    
    btnChaveiros.addEventListener('click',()=>{
        while (ulVitrine.firstChild) {
            ulVitrine.removeChild(ulVitrine.firstChild);
          }
        
        produtos.forEach(produto => {
            if(produto.tag[0] === 'Chaveiros'){
                let card = criarCards(produto)
                ulVitrine.appendChild(card)
            }
        });
    })   

    btnCaixas.addEventListener('click',()=>{
        while (ulVitrine.firstChild) {
            ulVitrine.removeChild(ulVitrine.firstChild);
          }
        
        produtos.forEach(produto => {
            if(produto.tag[0] === 'Caixas'){
            let card = criarCards(produto)
            ulVitrine.appendChild(card)
            }
        });
    })   

    btnEsculturas.addEventListener('click',()=>{
        while (ulVitrine.firstChild) {
            ulVitrine.removeChild(ulVitrine.firstChild);
          }
        
        produtos.forEach(produto => {
            if(produto.tag[0] === 'Esculturas'){
                let card = criarCards(produto)
                ulVitrine.appendChild(card)
            }
        });
    })  

    btnPesquisar.addEventListener('click',()=>{
    while (ulVitrine.firstChild) {
        ulVitrine.removeChild(ulVitrine.firstChild);
    }

    const input = document.querySelector('input')
    const pesquisa = input.value.toUpperCase()
    console.log(pesquisa)

    produtos.forEach(produto => {
        if (produto.tag[0].toUpperCase() === pesquisa || 
            produto.tag[0].toUpperCase() === pesquisa+'S' || 
            produto.nameItem.toUpperCase().includes(pesquisa) &&
            pesquisa != ''){
            let card = criarCards(produto)
            ulVitrine.appendChild(card)
        }
        else if ( pesquisa == ""){
            let card = criarCards(produto)
            ulVitrine.appendChild(card)
        }
    });
   
})
    vitrine.appendChild(ulVitrine)
    addCarrinho(produtos)
   
}

function criarCards(produto){
    const fotoProduto    = document.createElement('img')
    const tag            = document.createElement('span')
    const nomeProduto    = document.createElement('h2')
    const descricao      = document.createElement('p')
    const valor          = document.createElement('span')
    const card           = document.createElement('li')
    const divImg         = document.createElement('div')
    const divDescricao   = document.createElement('div')
    const btnAddCarrinho = document.createElement('button')
    card.id = produto.id
        
    fotoProduto.src          = produto.img
    tag.innerHTML            = produto.tag
    nomeProduto.innerHTML    = produto.nameItem
    descricao.innerHTML      = produto.description
    valor.innerHTML          = `R$ ${produto.value},00`
    btnAddCarrinho.innerText = 'Adicionar ao carrinho'
    
    fotoProduto.classList.add('imgProdutos')
    tag.classList.add('tag')
    nomeProduto.classList.add('nomeProdutos')
    descricao.classList.add('descricoes') 
    valor.classList.add('valores')
    btnAddCarrinho.classList.add('btnAddCarrinho')
    divImg.classList.add('img')
    divDescricao.classList.add('descricao')
    card.classList.add('card')

    divImg.appendChild(fotoProduto)
    divDescricao.appendChild(tag)
    divDescricao.appendChild(nomeProduto)
    divDescricao.appendChild(descricao)
    divDescricao.appendChild(valor)
    divDescricao.appendChild(btnAddCarrinho)
    card.appendChild(divImg)
    card.appendChild(divDescricao)
    
    return card
}
 
let qntd  = 0
let total = 0

function addCarrinho(produtos){
    
    const btnAddCarrinho = document.getElementsByClassName('btnAddCarrinho')
    const ulCarrinho     = document.createElement('ul')
    const mainCarrinho   = document.getElementById('mainCarrinho')
    const valor          = document.createElement('span')
    const quantidade     = document.createElement('span')
    ulCarrinho.id = 'ulCarrinho'
    
    for (let i = 0; i < btnAddCarrinho.length; i++){
        btnAddCarrinho[i].addEventListener('click', ()=>{
            qntd ++
            total += produtos[i].value

            ulCarrinho.appendChild(criarCarrinho(produtos[i]))
            mainCarrinho.appendChild(ulCarrinho)
            
            valor.innerHTML = `R$ ${total},00`
            quantidade.innerHTML = qntd
        })
    }

    document.getElementById('qntd').appendChild(quantidade)
    document.getElementById('total').appendChild(valor)
    
}

function criarCarrinho(produto){
    const btnRemover      = document.createElement('button')
    const imgCarrinho     = document.createElement('img')
    const itemCarrinho    = document.createElement('li')
    const infoCarrinho    = document.createElement('div')

    itemCarrinho.classList.add('itensCarrinho')
    btnRemover.classList.add('btnRemover')
    document.getElementById('carrVazio').classList.add('hidden')
    document.getElementById('adicioneItens').classList.add('hidden')
    document.getElementById('mainCarrinho').classList.add('carrinhoAtualizado')
    document.getElementById('mainCarrinho').classList.remove('mainCarrinho')
    
    btnRemover.innerText  = 'Remover produto'
    imgCarrinho.src       = produto.img
    infoCarrinho.insertAdjacentHTML("afterbegin", 
                                    `<h3>     ${produto.nameItem} </h3>
                                     <p> R$   ${produto.value},00 </p>`)


    infoCarrinho.appendChild(btnRemover)
    itemCarrinho.appendChild(imgCarrinho)
    itemCarrinho.appendChild(infoCarrinho)

    btnRemover.addEventListener('click', (event)=>{
        const btn = event.target
        const produto = btn.parentElement
        const parent = produto.parentElement
        const nameItem = parent.childNodes[1].childNodes[0].innerText
        const produtoAchado = data.find((produto)=> produto.nameItem == nameItem)
        console.log(produtoAchado)
        
        parent.classList.add('hidden')
        parent.classList.remove('itensCarrinho')
        total -= produtoAchado.value
        qntd --
    })

    return itemCarrinho      
}


function quantidade(qntd){
    const quantidade = document.createElement('li')
    const titulo     = document.createElement('h4')
    const span       = document.createElement('span')
    titulo.innerText = 'Total:'
    span.innerHTML   = qntd
    
    quantidade.appendChild(titulo)
    quantidade.appendChild(span)

    return quantidade
}

function soma(total){
    const valorFinal = document.createElement('li')
    const titulo     = document.createElement('h4')
    const span       = document.createElement('span')
    titulo.innerText = 'Total:'
    span.innerHTML   = `R$ ${total},00`

    valorFinal.appendChild(titulo)
    valorFinal.appendChild(span)

    return valorFinal 
}

addCards(data)