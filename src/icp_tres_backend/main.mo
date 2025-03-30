import Blob "mo:base/Blob";
import Text "mo:base/Text";
import Cycles "mo:base/ExperimentalCycles";
import Nat "mo:base/Nat";
import IC "ic:aaaaa-aa";
import Debug "mo:base/Debug";
import List "mo:base/List";

actor {
// Estructura del objeto
  type Registro = {
    nombre: Text;
    sueno: Text;
    color: Text;
    token: Text;
  };

  // Lista para almacenar registros
  var registros : List.List<Registro> = List.nil<Registro>();

  // Guardar múltiples registros (hasta 100 si no se puede indefinido)
  public func guardarRegistros(datos : [Registro]) : async Text {
    let maxRegistros = 1000;
    var contador = 0;

    for (dato in datos.vals()) {
      if (contador >= maxRegistros) {
        return "Se alcanzó el límite de 100 registros";
      };
      registros := List.push(dato, registros);
      contador += 1;
    };
    return "Registros guardados correctamente";
  };

  // Obtener todos los registros de golpe
  public query func obtenerRegistros() : async [Registro] {
    return List.toArray(registros);
  };

public func borrarTodosLosRegistros() : async Text {
    registros := List.nil<Registro>(); // Reinicia la lista vacía
    return "Todos los registros han sido eliminados correctamente";
  };

  // Función de transformación para filtrar respuesta HTTP antes del consenso
  public query func transform(payload : { context : Blob; response : IC.http_request_result }) : async IC.http_request_result {
    return { payload.response with headers = [] };
  };

  // Método genérico para solicitudes HTTP
  private func realizarSolicitudHTTP(url : Text, method : {#get; #post; #head}, body : ?Blob) : async Text {
    let headers = [
  { name = "User-Agent"; value = "motoko-client" },
  { name = "Content-Type"; value = "application/json; charset=UTF-8" }
];

    let request : IC.http_request_args = {
      url = url;
      max_response_bytes = null;
      headers = headers;
      body = body;
      method = method;
      transform = ?{ function = transform; context = Blob.fromArray([]) };
    };

    Cycles.add<system>(100_000_000_000);
    let respuestaHTTP = await IC.http_request(request);

    let textoRespuesta : Text = switch (Text.decodeUtf8(respuestaHTTP.body)) {
      case null       { "Error: respuesta no es texto válido" };
      case (?contenido) { contenido };
    };

    return textoRespuesta;
  };

  // Endpoint: Health Check
  public func healthCheck() : async Text {
    return await realizarSolicitudHTTP("http://ApiProduccion-env.eba-cprgqr42.us-east-1.elasticbeanstalk.com:8080/api/test", #get, null);
  };

  // Endpoint: Registro de Mentor
  public func registrarMentor(bodyJson : Text) : async Text {
    Debug.print("Enviando JSON: " # bodyJson);
    return await realizarSolicitudHTTP("http://ApiProduccion-env.eba-cprgqr42.us-east-1.elasticbeanstalk.com:8080/api/auth/registrar/mentor", #post, ?Text.encodeUtf8(bodyJson));
  };

  // Endpoint: Registro de Emprendedor
  public func registrarEmprendedor(bodyJson : Text) : async Text {
    return await realizarSolicitudHTTP("http://ApiProduccion-env.eba-cprgqr42.us-east-1.elasticbeanstalk.com:8080/api/auth/registrar/emprendedor", #post, ?Text.encodeUtf8(bodyJson));
  };

  // Endpoint: Login Emprendedor
  public func loginEmprendedor(bodyJson : Text) : async Text {
    return await realizarSolicitudHTTP("http://ApiProduccion-env.eba-cprgqr42.us-east-1.elasticbeanstalk.com:8080/api/auth/login", #post, ?Text.encodeUtf8(bodyJson));
  };

  // Endpoint: Login Mentor
  public func loginMentor(bodyJson : Text) : async Text {
    return await realizarSolicitudHTTP("http://ApiProduccion-env.eba-cprgqr42.us-east-1.elasticbeanstalk.com:8080/api/auth/login", #post, ?Text.encodeUtf8(bodyJson));
  };

  // Endpoint: Enviar Mensaje (Parámetros URL)
  public func enviarMensajeURL(emprendedorId : Nat, mentorId : Nat, contenido : Text) : async Text {
    let url = "http://ApiProduccion-env.eba-cprgqr42.us-east-1.elasticbeanstalk.com:8080/api/chat/enviarMensaje?emprendedorId=" # Nat.toText(emprendedorId) # "&mentorId=" # Nat.toText(mentorId) # "&contenido=" # contenido;
    return await realizarSolicitudHTTP(url, #post, null);
  };

  // Endpoint: Enviar Mensaje (JSON)
  public func enviarMensajeJSON(bodyJson : Text) : async Text {
    return await realizarSolicitudHTTP("http://ApiProduccion-env.eba-cprgqr42.us-east-1.elasticbeanstalk.com:8080/api/chat/enviarMensaje", #post, ?Text.encodeUtf8(bodyJson));
  };

  // Endpoint: Enviar Mensaje como Mentor
  public func enviarMensajeComoMentor(bodyJson : Text) : async Text {
    return await realizarSolicitudHTTP("http://ApiProduccion-env.eba-cprgqr42.us-east-1.elasticbeanstalk.com:8080/api/chat/enviarMensajeComoMentor", #post, ?Text.encodeUtf8(bodyJson));
  };

  // Endpoint: Obtener chat entre dos usuarios
  public func obtenerChat(usuario1 : Nat, usuario2 : Nat) : async Text {
    let url = "http://ApiProduccion-env.eba-cprgqr42.us-east-1.elasticbeanstalk.com:8080/api/chat/chat/" # Nat.toText(usuario1) # "/" # Nat.toText(usuario2);
    return await realizarSolicitudHTTP(url, #get, null);
  };

  // Endpoint: Obtener usuarios con mensajes
  public func obtenerUsuariosConMensajes() : async Text {
    return await realizarSolicitudHTTP("http://ApiProduccion-env.eba-cprgqr42.us-east-1.elasticbeanstalk.com:8080/api/chat/usuarios", #get, null);
  };
  // Endpoint: Obtener Emprendedor por ID
  public func obtenerEmprendedorPorId(id : Nat) : async Text {
    let url = "http://ApiProduccion-env.eba-cprgqr42.us-east-1.elasticbeanstalk.com:8080/api/emprendedores/" # Nat.toText(id);
    return await realizarSolicitudHTTP(url, #get, null);
  };

  // Endpoint: Obtener Mentor por ID
  public func obtenerMentorPorId(id : Nat) : async Text {
    let url = "http://ApiProduccion-env.eba-cprgqr42.us-east-1.elasticbeanstalk.com:8080/api/mentores/" # Nat.toText(id);
    return await realizarSolicitudHTTP(url, #get, null);
  };

  // Endpoint: Obtener lista de Mentores
  public func obtenerMentores() : async Text {
    return await realizarSolicitudHTTP("http://ApiProduccion-env.eba-cprgqr42.us-east-1.elasticbeanstalk.com:8080/api/mentores", #get, null);
  };
};
