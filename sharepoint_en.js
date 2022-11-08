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
              json.resultados.push({
                item: '5.1-1',
                label: "Where passwords are used and in any state other than the factory default, all consumer IoT device passwords shall be unique per device or defined by the user.",
                resultado: leitura['OData__x0035__x002e_1_x002d_1']
              }),
              json.resultados.push({
                item: "5.1-2",
                label: "Where pre-installed unique per device passwords are used, these shall be generated with a mechanism that reduces the risk of automated attacks against a class or type of device.",
                resultado: leitura['OData__x0035__x002e_1_x002d_2']
              }),
              json.resultados.push({
                item: "5.1-3",
                label: "Authentication mechanisms used to authenticate users against a device shall use best practice cryptography, appropriate to the properties of the technology, risk and usage.",
                resultado: leitura['OData__x0035__x002e_1_x002d_3'],
              }),
              json.resultados.push({
                item: "5.1-4",
                label: "Where a user can authenticate against a device, the device shall provide to the user or an administrator a simple mechanism to change the authentication value used.",
                resultado: leitura['OData__x0035__x002e_1_x002d_4'],
              }),
              json.resultados.push({
                item: "5.1-5",
                label: "When the device is not a constrained device, it shall have a mechanism available which makes bruteforce attacks on authentication mechanisms via network interfaces impracticable.",
                resultado: leitura['OData__x0035__x002e_1_x002d_5'],
              }),
              json.resultados.push({
                item: "5.2-1",
                label: "The manufacturer shall make a vulnerability disclosure policy publicly available. This policy shall include, at a minimum:• contact information for the reporting of issues; and • information on timelines for:1) initial acknowledgement of receipt; and 2) status updates until the resolution of the reported issues.",
                resultado: leitura['OData__x0035__x002e_2_x002d_1'],
              }),
              json.resultados.push({
                item: "5.2-2",
                label: "Disclosed vulnerabilities should be acted on in a timely manner.",
                resultado: leitura['OData__x0035__x002e_2_x002d_2'],
              }),
              json.resultados.push({
                item: "5.2-3",
                label: "Manufacturers should continually monitor for, identify and rectify security vulnerabilities within products and services they sell, produce, have produced and services they operate during the defined support period.",
                resultado: leitura['OData__x0035__x002e_2_x002d_3'],
              }),
              json.resultados.push({
                item: "5.3-1",
                label: "All software components in consumer IoT devices should be securely updateable.",
                resultado: leitura['OData__x0035__x002e_3_x002d_1'],
              }),
              json.resultados.push({
                item: "5.3-2",
                label: "When the device is not a constrained device, it shall have an update mechanism for the secure installation of updates.",
                resultado: leitura['OData__x0035__x002e_3_x002d_2'],
              }),
              json.resultados.push({
                item: "5.3-3",
                label: "An update shall be simple for the user to apply.",
                resultado: leitura['OData__x0035__x002e_3_x002d_3'],
              }),
              json.resultados.push({
                item: "5.3-4",
                label: "Automatic mechanisms should be used for software updates.",
                resultado: leitura['OData__x0035__x002e_3_x002d_4'],
              }),
              json.resultados.push({
                item: "5.3-5",
                label: "The device should check after initialization, and then periodically, whether security updates are available.",
                resultado: leitura['OData__x0035__x002e_3_x002d_5'],
              }),
              json.resultados.push({
                item: "5.3-6",
                label: "If the device supports automatic updates and/or update notifications, these should be enabled in the initialized state and configurable so that the user can enable, disable, or postpone installation of security updates and/or update notifications.",
                resultado: leitura['OData__x0035__x002e_3_x002d_6'],
              }),
              json.resultados.push({
                item: "5.3-7",
                label: "The device shall use best practice cryptography to facilitate secure update mechanisms.",
                resultado: leitura['OData__x0035__x002e_3_x002d_7'],
              }),
              json.resultados.push({
                item: "5.3-8",
                label: "Security updates shall be timely.",
                resultado: leitura['OData__x0035__x002e_3_x002d_8'],
              }),
              json.resultados.push({
                item: "5.3-9",
                label: "The device should verify the authenticity and integrity of software updates.",
                resultado: leitura['OData__x0035__x002e_3_x002d_9'],
              }),
              json.resultados.push({
                item: "5.3-10",
                label: "Where updates are delivered over a network interface, the device shall verify the authenticity and integrity of each update via a trust relationship.",
                resultado: leitura['OData__x0035__x002e_3_x002d_10Quandoas'],
              }),
              json.resultados.push({
                item: "5.3-11",
                label: "The manufacturer should inform the user in a recognizable and apparent manner that a security update is required together with information on the risks mitigated by that update.",
                resultado: leitura['OData__x0035__x002e_3_x002d_11'],
              }),
              json.resultados.push({
                item: "5.3-12",
                label: "The device should notify the user when the application of a software update will disrupt the basic functioning of the device.",
                resultado: leitura['OData__x0035__x002e_3_x002d_12'],
              }),
              json.resultados.push({
                item: "5.3-13",
                label: "The manufacturer shall publish, in an accessible way that is clear and transparent to the user, the defined support period.",
                resultado: leitura['OData__x0035__x002e_3_x002d_13'],
              }),
              json.resultados.push({
                item: "5.3-14",
                label: "For constrained devices that cannot have their software updated, the rationale for the absence of software updates, the period and method of hardware replacement support and a defined support period should be published by the manufacturer in an accessible way that is clear and transparent to the user.",
                resultado: leitura['OData__x0035__x002e_3_x002d_14'],
              }),
              json.resultados.push({
                item: "5.3-15",
                label: "For constrained devices that cannot have their software updated, the product should be isolable and the hardware replaceable.",
                resultado: leitura['OData__x0035__x002e_3_x002d_15'],
              }),
              json.resultados.push({
                item: "5.3-16",
                label: "The model designation of the consumer IoT device shall be clearly recognizable, either by labelling on the device or via a physical interface.",
                resultado: leitura['OData__x0035__x002e_3_x002d_16'],
              }),
              json.resultados.push({
                item: "5.4-1",
                label: "Sensitive security parameters in persistent storage shall be stored securely by the device.",
                resultado: leitura['OData__x0035__x002e_4_x002d_1'],
              }),
              json.resultados.push({
                item: "5.4-2",
                label: "Where a hard-coded unique per device identity is used in a device for security purposes, it shall be implemented in such a way that it resists tampering by means such as physical, electrical or software.",
                resultado: leitura['OData__x0035__x002e_4_x002d_2'],
              }),
              json.resultados.push({
                item: "5.4-3",
                label: "Hard-coded critical security parameters in device software source code shall not be used. Reverse engineering of devices and applications can easily discover credentials such as hard-coded usernames and passwords in software. These credentials can also be API keys that allow usage of security-sensitive functions in a remote service, or private keys used in the security of protocols that the device uses to communicate. Such credentials will often be found within source-code, which is well-known bad practice. Simple obfuscation methods also used to obscure or encrypt this hard-coded information can be trivially broken.",
                resultado: leitura['OData__x0035__x002e_4_x002d_3'],
              }),
              json.resultados.push({
                item: "5.4-4",
                label: "Any critical security parameters used for integrity and authenticity checks of software updates and forprotection of communication with associated services in device software shall be unique per device and shall beproduced with a mechanism that reduces the risk of automated attacks against classes of devices.",
                resultado: leitura['OData__x0035__x002e_4_x002d_4'],
              }),
              json.resultados.push({
                item: "5.5-1",
                label: "The consumer IoT device shall use best practice cryptography to communicate securely.",
                resultado: leitura['OData__x0035__x002e_5_x002d_1'],
              }),
              json.resultados.push({
                item: "5.5-2",
                label: "The consumer IoT device should use reviewed or evaluated implementations to deliver network and security functionalities, particularly in the field of cryptography.",
                resultado: leitura['OData__x0035__x002e_5_x002d_2'],
              }),
              json.resultados.push({
                item: "5.5-3",
                label: "Cryptographic algorithms and primitives should be updateable.",
                resultado: leitura['OData__x0035__x002e_5_x002d_3'],
              }),
              json.resultados.push({
                item: "5.5-4",
                label: "Access to device functionality via a network interface in the initialized state should only be possible after authentication on that interface.",
                resultado: leitura['OData__x0035__x002e_5_x002d_4'],
              }),
              json.resultados.push({
                item: "5.5-5",
                label: "Device functionality that allows security-relevant changes in configuration via a network interface shall only be accessible after authentication. The exception is for network service protocols that are relied upon by the device and where the manufacturer cannot guarantee what configuration will be required for the device to operate.",
                resultado: leitura['OData__x0035__x002e_5_x002d_5'],
              }),
              json.resultados.push({
                item: "5.5-6",
                label: "Critical security parameters should be encrypted in transit, with such encryption appropriate to the properties of the technology, risk and usage.",
                resultado: leitura['OData__x0035__x002e_5_x002d_6'],
              }),
              json.resultados.push({
                item: "5.5-7",
                label: "The consumer IoT device shall protect the confidentiality of critical security parameters that are communicated via remotely accessible network interfaces.",
                resultado: leitura['OData__x0035__x002e_5_x002d_7'],
              }),
              json.resultados.push({
                item: "5.5-8",
                label: "The manufacturer shall follow secure management processes for critical security parameters that relate to the device.",
                resultado: leitura['OData__x0035__x002e_5_x002d_8'],
              }),
              json.resultados.push({
                item: "5.6-1",
                label: "All unused network and logical interfaces shall be disabled.",
                resultado: leitura['OData__x0035__x002e_6_x002d_1'],
              }),
              json.resultados.push({
                item: "5.6-2",
                label: "In the initialized state, the network interfaces of the device shall minimize the unauthenticated disclosure of security-relevant information.",
                resultado: leitura['OData__x0035__x002e_6_x002d_2'],
              }),
              json.resultados.push({
                item: "5.6-3",
                label: "Device hardware should not unnecessarily expose physical interfaces to attack.",
                resultado: leitura['OData__x0035__x002e_6_x002d_3'],
              }),
              json.resultados.push({
                item: "5.6-4",
                label: "Where a debug interface is physically accessible, it shall be disabled in software.",
                resultado: leitura['OData__x0035__x002e_6_x002d_4'],
              }),
              json.resultados.push({
                item: "5.6-5",
                label: "The manufacturer should only enable software services that are used or required for the intended use or operation of the device.",
                resultado: leitura['OData__x0035__x002e_6_x002d_5'],
              }),
              json.resultados.push({
                item: "5.6-6",
                label: "Code should be minimized to the functionality necessary for the service/device to operate.",
                resultado: leitura['OData__x0035__x002e_6_x002d_6'],
              }),
              json.resultados.push({
                item: "5.6-7",
                label: "Software should run with least necessary privileges, taking account of both security and functionality.",
                resultado: leitura['OData__x0035__x002e_6_x002d_7'],
              }),
              json.resultados.push({
                item: "5.6-8",
                label: "The device should include a hardware-level access control mechanism for memory.",
                resultado: leitura['OData__x0035__x002e_6_x002d_8'],
              }),
              json.resultados.push({
                item: "5.6-9",
                label: "The manufacturer should follow secure development processes for software deployed on the device.",
                resultado: leitura['OData__x0035__x002e_6_x002d_9'],
              }),
              json.resultados.push({
                item: "5.7-1",
                label: "The consumer IoT device should verify its software using secure boot mechanisms.",
                resultado: leitura['OData__x0035__x002e_7_x002d_1'],
              }),
              json.resultados.push({
                item: "5.7-2",
                label: "If an unauthorized change is detected to the software, the device should alert the user and/or administrator to the issue and should not connect to wider networks than those necessary to perform the alerting function.",
                resultado: leitura['OData__x0035__x002e_7_x002d_2'],
              }),
              json.resultados.push({
                item: "5.8-1",
                label: "The confidentiality of personal data transiting between a device and a service, especially associated services, should be protected, with best practice cryptography.",
                resultado: leitura['OData__x0035__x002e_8_x002d_1'],
              }),
              json.resultados.push({
                item: "5.8-2",
                label: "The confidentiality of sensitive personal data communicated between the device and associated services shall be protected, with cryptography appropriate to the properties of the technology and usage.",
                resultado: leitura['OData__x0035__x002e_8_x002d_2'],
              }),
              json.resultados.push({
                item: "5.8-3",
                label: "All external sensing capabilities of the device shall be documented in an accessible way that is clear and transparent for the user.",
                resultado: leitura['OData__x0035__x002e_8_x002d_3'],
              }),
              json.resultados.push({
                item: "5.9-1",
                label: "Resilience should be built in to consumer IoT devices and services, taking into account the possibility of outages of data networks and power.",
                resultado: leitura['OData__x0035__x002e_9_x002d_1'],
              }),
              json.resultados.push({
                item: "5.9-2",
                label: "Consumer IoT devices should remain operating and locally functional in the case of a loss of network access and should recover cleanly in the case of restoration of a loss of power.",
                resultado: leitura['OData__x0035__x002e_9_x002d_2'],
              }),
              json.resultados.push({
                item: "5.9-3",
                label: "The consumer IoT device should connect to networks in an expected, operational and stable state and in an orderly fashion, taking the capability of the infrastructure into consideration.",
                resultado: leitura['OData__x0035__x002e_9_x002d_3'],
              }),
              json.resultados.push({
                item: "5.10-1",
                label: "If telemetry data is collected from consumer IoT devices and services, such as usage and measurement data, it should be examined for security anomalies.",
                resultado: leitura['OData__x0035__x002e_10_x002d_1'],
              }),
              json.resultados.push({
                item: "5.11-1",
                label: "The user shall be provided with functionality such that user data can be erased from the device in a simple manner.",
                resultado: leitura['OData__x0035__x002e_11_x002d_1'],
              }),
              json.resultados.push({
                item: "5.11-2",
                label: "The consumer should be provided with functionality on the device such that personal data can be removed from associated services in a simple manner.",
                resultado: leitura['OData__x0035__x002e_11_x002d_2'],
              }),
              json.resultados.push({
                item: "5.11-3",
                label: "Users should be given clear instructions on how to delete their personal data.",
                resultado: leitura['OData__x0035__x002e_11_x002d_3'],
              }),
              json.resultados.push({
                item: "5.11-4",
                label: "Users should be provided with clear confirmation that personal data has been deleted from services, devices and applications.",
                resultado: leitura['OData__x0035__x002e_11_x002d_4'],
              }),
              json.resultados.push({
                item: "5.12-1",
                label: "Installation and maintenance of consumer IoT should involve minimal decisions by the user and should follow security best practice on usability.",
                resultado: leitura['OData__x0035__x002e_12_x002d_1'],
              }),
              json.resultados.push({
                item: "5.12-2",
                label: "The manufacturer should provide users with guidance on how to securely set up their device. However, the ideal is for a process that involves the minimum of human intervention and which achieves a secure configuration automatically.",
                resultado: leitura['OData__x0035__x002e_12_x002d_2'],
              }),
              json.resultados.push({
                item: "5.12-3",
                label: "The manufacturer should provide users with guidance on how to check whether their device is securely set up.",
                resultado: leitura['OData__x0035__x002e_12_x002d_3'],
              }),
              json.resultados.push({
                item: "5.13-1",
                label: "The consumer IoT device software shall validate data input via user interfaces or transferred via Application Programming Interfaces (APIs) or between networks in services and devices.",
                resultado: leitura['OData__x0035__x002e_13_x002d_1'],
              }),
              json.resultados.push({
                item: "6.1",
                label: "The manufacturer shall provide consumers with clear and transparent information about what personal data is processed, how it is being used, by whom, and for what purposes, for each device and service. This also applies to third parties that can be involved, including advertisers.",
                resultado: leitura['OData__x0036__x002e_1'],
              }),
              json.resultados.push({
                item: "6.2",
                label: "Where personal data is processed on the basis of consumers' consent, this consent shall be obtained in a valid way.",
                resultado: leitura['OData__x0036__x002e_2'],
              }),
              json.resultados.push({
                item: "6.3",
                label: "Consumers who gave consent for the processing of their personal data shall have the capability to withdraw it at any time.",
                resultado: leitura['OData__x0036__x002e_3'],
              }),
              json.resultados.push({
                item: "6.4",
                label: "If telemetry data is collected from consumer IoT devices and services, the processing of personal data should be kept to the minimum necessary for the intended functionality.",
                resultado: leitura['OData__x0036__x002e_4'],
              }),
              json.resultados.push({
                item: "6.5",
                label: "If telemetry data is collected from consumer IoT devices and services, consumers shall be provided with information on what telemetry data is collected, how it is being used, by whom, and for what purposes.",
                resultado: leitura['OData__x0036__x002e_5'],
              })
              fs.writeFileSync('./data.json', JSON.stringify(json, null, 2))
        }
   });
})