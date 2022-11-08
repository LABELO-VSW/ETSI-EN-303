const request = require('request');
const fs = require('fs')
function getToken(callback){
    options = {
        client_id: '8bc38144-c85d-48b3-8d8e-46347713472b@51ebcf31-5839-412e-83bb-801a2ba78627',
        client_secret: 'FeIjyUTE8h94H+5hGS8MrF3OYjYT9SWgTeFRvLQGsZg=',
        grant_type: 'client_credentials',
        resource: '00000003-0000-0ff1-ce00-000000000000/brpucrs.sharepoint.com@51ebcf31-5839-412e-83bb-801a2ba78627'
    }
    request.post('https://accounts.accesscontrol.windows.net/51ebcf31-5839-412e-83bb-801a2ba78627/tokens/OAuth/2/', {form: options}, function(err, res, body){
        if(err){
            callback(null, err);
        } else {
            try{
                callback(JSON.parse(body).access_token, null);
            }catch(e){
                callback(null, body);
            }
        }
    });
}

getToken(function(token, err){
    const list_name = "Registro de Ensaio ETSI 303"
    const protocolo = "63538"
    const json = JSON.parse(fs.readFileSync('./data.json'))
    json.resultados = [];
   request.get(`https://brpucrs.sharepoint.com/sites/labelo_vsw/_api/web/lists/GetByTitle('${list_name}')/items?Title eq '${protocolo}'`, {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json;odata=verbose',
        'Content-Type': 'application/json;odata=verbose'
    }
   }, function(err, res, body){
         if(err){
              console.log(err);
         } else {
              const leitura = JSON.parse(body).d.results[0];
              Object.keys(leitura).forEach(k=>{
                if (leitura[k]=== 'N'){
                    leitura[k] = "NC"
                }else if(leitura[k] === 'Y'){
                    leitura[k] = "C"
                }
              })
              
              json.resultados.push({
                item: '5.1-1',
                label: "Quando as senhas são usadas e em qualquer estado que não seja o padrão de fábrica, todas as senhas do dispositivo IoT do consumidor devem ser exclusivas por dispositivo ou definidas pelo usuário.",
                resultado: leitura['OData__x0035__x002e_1_x002d_1']
              }),
              json.resultados.push({
                item: "5.1-2",
                label: "Quando forem usadas senhas exclusivas por dispositivo pré-instaladas, elas devem ser geradas com um mecanismo que reduza o risco de ataques automatizados contra uma classe ou tipo de dispositivo.",
                resultado: leitura['OData__x0035__x002e_1_x002d_2']
              }),
              json.resultados.push({
                item: "5.1-3",
                label: "Os mecanismos de autenticação usados para autenticar usuários em um dispositivo devem usar criptografia de melhores práticas, apropriadas às propriedades da tecnologia, risco e uso.",
                resultado: leitura['OData__x0035__x002e_1_x002d_3'],
              }),
              json.resultados.push({
                item: "5.1-4",
                label: "Quando um usuário puder se autenticar em um dispositivo, o dispositivo deve fornecer ao usuário ou administrador um mecanismo simples para alterar o valor de autenticação usado.",
                resultado: leitura['OData__x0035__x002e_1_x002d_4'],
              }),
              json.resultados.push({
                item: "5.1-5",
                label: "Quando o dispositivo não for um dispositivo restrito, ele deverá ter um mecanismo disponível que inviabilize ataques de força bruta aos mecanismos de autenticação via interfaces de rede.",
                resultado: leitura['OData__x0035__x002e_1_x002d_5'],
              }),
              json.resultados.push({
                item: "5.2-1",
                label: "O fabricante deve disponibilizar publicamente uma política de divulgação de vulnerabilidades. Esta política deve incluir, no mínimo:- informações de contato para o relato de problemas; e - informações sobre cronogramas para: 1) aviso de recebimento inicial; e 2) atualizações de status até a resolução dos problemas relatados.",
                resultado: leitura['OData__x0035__x002e_2_x002d_1'],
              }),
              json.resultados.push({
                item: "5.2-2",
                label: "As vulnerabilidades divulgadas devem ser tratadas em tempo hábil.",
                resultado: leitura['OData__x0035__x002e_2_x002d_2'],
              }),
              json.resultados.push({
                item: "5.2-3",
                label: "Os fabricantes devem monitorar continuamente, identificar e corrigir vulnerabilidades de segurança em produtos e serviços que vendem, produzem, produziram e serviços que operam durante o período de suporte definido.",
                resultado: leitura['OData__x0035__x002e_2_x002d_3'],
              }),
              json.resultados.push({
                item: "5.3-1",
                label: "Todos os componentes de software em dispositivos de IoT do consumidor devem ser atualizados com segurança.",
                resultado: leitura['OData__x0035__x002e_3_x002d_1'],
              }),
              json.resultados.push({
                item: "5.3-2",
                label: "Quando o dispositivo não for um dispositivo restrito, ele deverá ter um mecanismo de atualização para a instalação segura de atualizações.",
                resultado: leitura['OData__x0035__x002e_3_x002d_2'],
              }),
              json.resultados.push({
                item: "5.3-3",
                label: "Uma atualização deve ser simples para o usuário aplicar.",
                resultado: leitura['OData__x0035__x002e_3_x002d_3'],
              }),
              json.resultados.push({
                item: "5.3-4",
                label: "Mecanismos automáticos devem ser usados para atualizações de software.",
                resultado: leitura['OData__x0035__x002e_3_x002d_4'],
              }),
              json.resultados.push({
                item: "5.3-5",
                label: "O dispositivo deve verificar após a inicialização e, em seguida, periodicamente, se as atualizações de segurança estão disponíveis.",
                resultado: leitura['OData__x0035__x002e_3_x002d_5'],
              }),
              json.resultados.push({
                item: "5.3-6",
                label: "Se o dispositivo suportar atualizações automáticas e/ou notificações de atualização, elas devem ser habilitadas no estado inicializado e configuráveis para que o usuário possa habilitar, desabilitar ou adiar a instalação de atualizações de segurança e/ou notificações de atualização.",
                resultado: leitura['OData__x0035__x002e_3_x002d_6'],
              }),
              json.resultados.push({
                item: "5.3-7",
                label: "O dispositivo deve usar a criptografia de melhores práticas para facilitar os mecanismos de atualização segura.",
                resultado: leitura['OData__x0035__x002e_3_x002d_7'],
              }),
              json.resultados.push({
                item: "5.3-8",
                label: "As atualizações de segurança devem ser oportunas.",
                resultado: leitura['OData__x0035__x002e_3_x002d_8'],
              }),
              json.resultados.push({
                item: "5.3-9",
                label: "O dispositivo deve verificar a autenticidade e integridade das atualizações de software.",
                resultado: leitura['OData__x0035__x002e_3_x002d_9'],
              }),
              json.resultados.push({
                item: "5.3-10",
                label: "Quando as atualizações são entregues por meio de uma interface de rede, o dispositivo deve verificar a autenticidade e a integridade de cada atualização por meio de uma relação de confiança.",
                resultado: leitura['OData__x0035__x002e_3_x002d_10Quandoas'],
              }),
              json.resultados.push({
                item: "5.3-11",
                label: "O fabricante deve informar o usuário de forma reconhecível e aparente que uma atualização de segurança é necessária juntamente com informações sobre os riscos mitigados por essa atualização.",
                resultado: leitura['OData__x0035__x002e_3_x002d_11'],
              }),
              json.resultados.push({
                item: "5.3-12",
                label: "O dispositivo deve notificar o usuário quando a aplicação de uma atualização de software interromper o funcionamento básico do dispositivo.",
                resultado: leitura['OData__x0035__x002e_3_x002d_12'],
              }),
              json.resultados.push({
                item: "5.3-13",
                label: "O fabricante deve publicar, de forma acessível, clara e transparente para o usuário, o período de suporte definido.",
                resultado: leitura['OData__x0035__x002e_3_x002d_13'],
              }),
              json.resultados.push({
                item: "5.3-14",
                label: "Para dispositivos restritos que não podem ter seu software atualizado, a justificativa para a ausência de atualizações de software, o período e método de suporte de substituição de hardware e um período de suporte definido devem ser publicados pelo fabricante de forma acessível, clara e transparente para o usuário.",
                resultado: leitura['OData__x0035__x002e_3_x002d_14'],
              }),
              json.resultados.push({
                item: "5.3-15",
                label: "Para dispositivos restritos que não podem ter seu software atualizado, o produto deve ser isolável e o hardware substituível.",
                resultado: leitura['OData__x0035__x002e_3_x002d_15'],
              }),
              json.resultados.push({
                item: "5.3-16",
                label: "A designação do modelo do dispositivo IoT do consumidor deve ser claramente reconhecível, seja por meio de uma etiqueta no dispositivo ou por meio de uma interface física.",
                resultado: leitura['OData__x0035__x002e_3_x002d_16'],
              }),
              json.resultados.push({
                item: "5.4-1",
                label: "Parâmetros de segurança sensíveis em armazenamento persistente devem ser armazenados de forma segura pelo dispositivo.",
                resultado: leitura['OData__x0035__x002e_4_x002d_1'],
              }),
              json.resultados.push({
                item: "5.4-2",
                label: "Quando uma identidade única por dispositivo codificada for usada em um dispositivo para fins de segurança, ela deve ser implementado de forma que resista à adulteração por meios físicos, elétricos ou de software.",
                resultado: leitura['OData__x0035__x002e_4_x002d_2'],
              }),
              json.resultados.push({
                item: "5.4-3",
                label: "Os parâmetros de segurança críticos codificados no código-fonte do software do dispositivo não devem ser usados.",
                resultado: leitura['OData__x0035__x002e_4_x002d_3'],
              }),
              json.resultados.push({
                item: "5.4-4",
                label: "Quaisquer parâmetros críticos de segurança usados para verificações de integridade e autenticidade de atualizações de software e para proteção de comunicação com serviços associados no software do dispositivo devem ser exclusivos por dispositivo e devem ser produzidos com um mecanismo que reduz o risco de ataques automatizados contra classes de dispositivos.",
                resultado: leitura['OData__x0035__x002e_4_x002d_4'],
              }),
              json.resultados.push({
                item: "5.5-1",
                label: "O dispositivo IoT do consumidor deve usar a criptografia de melhores práticas para se comunicar com segurança.",
                resultado: leitura['OData__x0035__x002e_5_x002d_1'],
              }),
              json.resultados.push({
                item: "5.5-2",
                label: "O dispositivo de IoT do consumidor deve usar implementações revisadas ou avaliadas para fornecer funcionalidades de rede e segurança, principalmente no campo da criptografia.",
                resultado: leitura['OData__x0035__x002e_5_x002d_2'],
              }),
              json.resultados.push({
                item: "5.5-3",
                label: "Algoritmos criptográficos e primitivos devem ser atualizáveis.",
                resultado: leitura['OData__x0035__x002e_5_x002d_3'],
              }),
              json.resultados.push({
                item: "5.5-4",
                label: "O acesso à funcionalidade do dispositivo por meio de uma interface de rede no estado inicializado só deve ser possível após a autenticação nessa interface.",
                resultado: leitura['OData__x0035__x002e_5_x002d_4'],
              }),
              json.resultados.push({
                item: "5.5-5",
                label: "A funcionalidade do dispositivo que permite alterações de configuração relevantes para a segurança por meio de uma interface de rede deve ser acessível somente após a autenticação. A exceção é para protocolos de serviço de rede nos quais o dispositivo confia e onde o fabricante não pode garantir qual configuração será necessária para o funcionamento do dispositivo.",
                resultado: leitura['OData__x0035__x002e_5_x002d_5'],
              }),
              json.resultados.push({
                item: "5.5-6",
                label: "Os parâmetros críticos de segurança devem ser criptografados em trânsito, com essa criptografia apropriada às propriedades da tecnologia, risco e uso.",
                resultado: leitura['OData__x0035__x002e_5_x002d_6'],
              }),
              json.resultados.push({
                item: "5.5-7",
                label: "O dispositivo IoT do consumidor deve proteger a confidencialidade dos parâmetros críticos de segurança que são comunicados por meio de interfaces de rede acessíveis remotamente.",
                resultado: leitura['OData__x0035__x002e_5_x002d_7'],
              }),
              json.resultados.push({
                item: "5.5-8",
                label: "O fabricante deve seguir processos de gerenciamento seguro para parâmetros críticos de segurança relacionados ao dispositivo.",
                resultado: leitura['OData__x0035__x002e_5_x002d_8'],
              }),
              json.resultados.push({
                item: "5.6-1",
                label: "Todas as interfaces lógicas e de rede não utilizadas devem ser desabilitadas.",
                resultado: leitura['OData__x0035__x002e_6_x002d_1'],
              }),
              json.resultados.push({
                item: "5.6-2",
                label: "No estado inicializado, as interfaces de rede do dispositivo devem minimizar a divulgação não autenticada de informações relevantes para a segurança.",
                resultado: leitura['OData__x0035__x002e_6_x002d_2'],
              }),
              json.resultados.push({
                item: "5.6-3",
                label: "O hardware do dispositivo não deve expor desnecessariamente as interfaces físicas a ataques.",
                resultado: leitura['OData__x0035__x002e_6_x002d_3'],
              }),
              json.resultados.push({
                item: "5.6-4",
                label: "Onde uma interface de depuração é fisicamente acessível, ela deve ser desabilitada no software.",
                resultado: leitura['OData__x0035__x002e_6_x002d_4'],
              }),
              json.resultados.push({
                item: "5.6-5",
                label: "O fabricante deve habilitar apenas os serviços de software que são usados ou necessários para o uso pretendido ou operação do dispositivo.",
                resultado: leitura['OData__x0035__x002e_6_x002d_5'],
              }),
              json.resultados.push({
                item: "5.6-6",
                label: "O código deve ser minimizado para a funcionalidade necessária para que o serviço/dispositivo funcione.",
                resultado: leitura['OData__x0035__x002e_6_x002d_6'],
              }),
              json.resultados.push({
                item: "5.6-7",
                label: "O software deve ser executado com os privilégios mínimos necessários, levando em consideração a segurança e a funcionalidade.",
                resultado: leitura['OData__x0035__x002e_6_x002d_7'],
              }),
              json.resultados.push({
                item: "5.6-8",
                label: "O dispositivo deve incluir um mecanismo de controle de acesso de nível de hardware para memória.",
                resultado: leitura['OData__x0035__x002e_6_x002d_8'],
              }),
              json.resultados.push({
                item: "5.6-9",
                label: "O fabricante deve seguir processos de desenvolvimento seguros para software implantado no dispositivo.",
                resultado: leitura['OData__x0035__x002e_6_x002d_9'],
              }),
              json.resultados.push({
                item: "5.7-1",
                label: "O dispositivo IoT do consumidor deve verificar seu software usando mecanismos de inicialização seguros.",
                resultado: leitura['OData__x0035__x002e_7_x002d_1'],
              }),
              json.resultados.push({
                item: "5.7-2",
                label: "Se uma alteração não autorizada for detectada no software, o dispositivo deve alertar o usuário e/ou administrador sobre o problema e não deve se conectar a redes mais amplas do que as necessárias para executar a função de alerta.",
                resultado: leitura['OData__x0035__x002e_7_x002d_2'],
              }),
              json.resultados.push({
                item: "5.8-1",
                label: "A confidencialidade dos dados pessoais que transitam entre um dispositivo e um serviço, especialmente serviços associados, deve ser protegida, com criptografia de melhores práticas.",
                resultado: leitura['OData__x0035__x002e_8_x002d_1'],
              }),
              json.resultados.push({
                item: "5.8-2",
                label: "A confidencialidade dos dados pessoais sensíveis comunicados entre o dispositivo e os serviços associados deve ser protegida, com criptografia adequada às propriedades da tecnologia e uso.",
                resultado: leitura['OData__x0035__x002e_8_x002d_2'],
              }),
              json.resultados.push({
                item: "5.8-3",
                label: "Todos os recursos de detecção externa do dispositivo devem ser documentados de forma acessível, clara e transparente para o usuário.",
                resultado: leitura['OData__x0035__x002e_8_x002d_3'],
              }),
              json.resultados.push({
                item: "5.9-1",
                label: "A resiliência deve ser incorporada aos dispositivos e serviços de IoT do consumidor, levando em consideração a possibilidade de interrupções de redes de dados e energia.",
                resultado: leitura['OData__x0035__x002e_9_x002d_1'],
              }),
              json.resultados.push({
                item: "5.9-2",
                label: "Os dispositivos de IoT de consumo devem permanecer operacionais e funcionais localmente no caso de perda de acesso à rede e devem se recuperar de forma limpa no caso de restauração de uma perda de energia.",
                resultado: leitura['OData__x0035__x002e_9_x002d_2'],
              }),
              json.resultados.push({
                item: "5.9-3",
                label: "O dispositivo IoT do consumidor deve se conectar às redes em um estado esperado, operacional e estável e de forma ordenada, levando em consideração a capacidade da infraestrutura.",
                resultado: leitura['OData__x0035__x002e_9_x002d_3'],
              }),
              json.resultados.push({
                item: "5.10-1",
                label: "Se os dados de telemetria forem coletados de dispositivos e serviços de IoT do consumidor, como dados de uso e medição, eles deverão ser examinados quanto a anomalias de segurança.",
                resultado: leitura['OData__x0035__x002e_10_x002d_1'],
              }),
              json.resultados.push({
                item: "5.11-1",
                label: "O usuário deve ser fornecido com a funcionalidade de modo que os dados do usuário possam ser apagados do dispositivo de maneira simples.",
                resultado: leitura['OData__x0035__x002e_11_x002d_1'],
              }),
              json.resultados.push({
                item: "5.11-2",
                label: "O consumidor deve receber funcionalidades no dispositivo de forma que os dados pessoais possam ser removidos dos serviços associados de maneira simples.",
                resultado: leitura['OData__x0035__x002e_11_x002d_2'],
              }),
              json.resultados.push({
                item: "5.11-3",
                label: "Os usuários devem receber instruções claras sobre como excluir seus dados pessoais.",
                resultado: leitura['OData__x0035__x002e_11_x002d_3'],
              }),
              json.resultados.push({
                item: "5.11-4",
                label: "Os usuários devem receber uma confirmação clara de que os dados pessoais foram excluídos dos serviços, dispositivos e aplicativos.",
                resultado: leitura['OData__x0035__x002e_11_x002d_4'],
              }),
              json.resultados.push({
                item: "5.12-1",
                label: "A instalação e a manutenção da IoT do consumidor devem envolver decisões mínimas do usuário e devem seguir as melhores práticas de segurança em usabilidade.",
                resultado: leitura['OData__x0035__x002e_12_x002d_1'],
              }),
              json.resultados.push({
                item: "5.12-2",
                label: "O fabricante deve fornecer aos usuários orientações sobre como configurar seu dispositivo com segurança.",
                resultado: leitura['OData__x0035__x002e_12_x002d_2'],
              }),
              json.resultados.push({
                item: "5.12-3",
                label: "O fabricante deve fornecer aos usuários orientações sobre como verificar se o dispositivo está configurado com segurança.",
                resultado: leitura['OData__x0035__x002e_12_x002d_3'],
              }),
              json.resultados.push({
                item: "5.13-1",
                label: "O software do dispositivo IoT do consumidor deve validar a entrada de dados por meio de interfaces de usuário ou transferidos por meio de interfaces de programação de aplicativos (APIs) ou entre redes em serviços e dispositivos.",
                resultado: leitura['OData__x0035__x002e_13_x002d_1'],
              }),
              json.resultados.push({
                item: "6.1",
                label: "O fabricante deve fornecer aos consumidores informações claras e transparentes sobre quais dados pessoais são processados, como estão sendo usados, por quem e para quais finalidades, para cada dispositivo e serviço. Isso também se aplica a terceiros que possam estar envolvidos, incluindo anunciantes.",
                resultado: leitura['OData__x0036__x002e_1'],
              }),
              json.resultados.push({
                item: "6.2",
                label: "Quando os dados pessoais são processados com base no consentimento do consumidor, esse consentimento deve ser obtido de forma válida.",
                resultado: leitura['OData__x0036__x002e_2'],
              }),
              json.resultados.push({
                item: "6.3",
                label: "Os consumidores que deram consentimento para o tratamento dos seus dados pessoais terão a possibilidade de os retirar a qualquer momento.",
                resultado: leitura['OData__x0036__x002e_3'],
              }),
              json.resultados.push({
                item: "6.4",
                label: "Se os dados de telemetria forem coletados de dispositivos e serviços de IoT do consumidor, o processamento de dados pessoais deve ser reduzido ao mínimo necessário para a funcionalidade pretendida.",
                resultado: leitura['OData__x0036__x002e_4'],
              }),
              json.resultados.push({
                item: "6.5",
                label: "Se os dados de telemetria forem coletados de dispositivos e serviços de IoT do consumidor, os consumidores devem receber informações sobre quais dados de telemetria são coletados, como estão sendo usados, por quem e para quais finalidades.",
                resultado: leitura['OData__x0036__x002e_5'],
              })
              fs.writeFileSync('./data.json', JSON.stringify(json, null, 2))
         }
   });
})