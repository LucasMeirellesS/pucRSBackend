class List {
  #base; // Campo privado para armazenar a lista interna de elementos.

  // Construtor da classe List
  constructor() {
    this.#base = []; // Inicializa a lista interna como um array vazio.
  }

  // Getter para acessar a lista interna
  get base() {
    return this.#base; // Retorna a lista interna privada.
  }

  // Método para adicionar um elemento ao final da lista
  push(element) {
    this.#base.push(element); // Adiciona o elemento ao final da lista.
  }

  // Método para remover um elemento da lista na posição especificada
  remove(pos) {
    // Verifica se a posição é válida
    if (pos < 0 || pos >= this.size) {
      throw new Error("Posicao invalida"); // Lança um erro se a posição for inválida.
    }
    this.#base.splice(pos, 1); // Remove o elemento na posição especificada.
  }

  // Método para verificar se a lista está vazia
  isEmpty() {
    return this.size === 0; // Retorna true se o tamanho da lista for 0, indicando que a lista está vazia.
  }

  // Getter para obter o tamanho da lista
  get size() {
    return this.#base.length; // Retorna o número de elementos na lista.
  }
}

export default List; // Exporta a classe List como o módulo padrão.
