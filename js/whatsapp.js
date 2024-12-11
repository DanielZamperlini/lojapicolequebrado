export function sendToWhatsApp(cartItems, total, userName) {
  const phoneNumber = '5591982066009'; // Substitua pelo seu número

  // Cabeçalho da mensagem
  let message = `🛍️ *Novo Pedido - Skate Shop* 🛹\n\n`;
  message += `*Cliente: ${userName}*\n\n`;

  // Lista de produtos
  message += '*Produtos Selecionados:*\n';
  cartItems.forEach((item, index) => {
    message += `\n${index + 1}. *${item.name}*\n`;
    message += `   • Quantidade: ${item.quantity}\n`;
    message += `   • Preço unitário: R$ ${item.price.toFixed(2)}\n`;
    message += `   • Subtotal: R$ ${(item.price * item.quantity).toFixed(2)}\n`;
  });

  // Total do pedido
  message += `\n💰 *Total do Pedido: R$ ${total.toFixed(2)}*\n\n`;

  // Mensagem de interesse
  message += '✨ *Informações Adicionais:*\n';
  message += `Olá! Sou ${userName} e tenho interesse nos produtos acima. `;
  message += 'Gostaria de saber sobre:\n';
  message += '• Formas de pagamento disponíveis\n';
  message += '• Prazo de entrega para minha região\n';
  message += '• Se há disponibilidade imediata\n\n';
  message += 'Aguardo retorno! 🏂';

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank');
}
