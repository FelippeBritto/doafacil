<?php

$router->get('/', function () use ($router) {
    return redirect()->route('api');
});

define('API_VERSION', '1.0');
$apiPattern = 'v1';

$router->group(['prefix' => $apiPattern], function () use ($router) {

    $router->post('/autenticacao/login', 'AutenticacaoController@post');

    $router->group(['namespace' => 'Instituicao'], function () use ($router) {
        $router->get('/instituicao', 'InstituicaoController@get');
        $router->get('/instituicao/{id}', 'InstituicaoController@get');
        $router->get('/instituicao/user/buscar/{id}', 'InstituicaoController@getInstisUser');
        $router->post('/instituicao', 'InstituicaoController@post');
        $router->patch('/instituicao/{id}', 'InstituicaoController@patch');
        $router->delete('/instituicao/{id}', 'InstituicaoController@delete');
    });

    $router->group(['namespace' => 'Evento'], function () use ($router) {
        $router->get('/evento', 'EventoController@get');
        $router->get('/evento/{id}', 'EventoController@get');
        $router->get('/evento/inistituicao/{id}', 'EventoController@getEventosByInsti');
        $router->post('/evento', 'EventoController@post');
        $router->patch('/evento/{id}', 'EventoController@patch');
        $router->delete('/evento/{id}', 'EventoController@delete');
    });

    $router->group(['namespace' => 'Ponto'], function () use ($router) {
        $router->get('/ponto/instituicao/{id}', 'PontoController@getPontoByInst');
        $router->get('/ponto', 'PontoController@get');
        $router->post('/ponto', 'PontoController@post');
        $router->patch('/ponto/{id}', 'PontoController@patch');
        $router->delete('/ponto/{id}', 'PontoController@delete');
    });

    $router->group(['namespace' => 'Conta'], function () use ($router) {
        $router->post('/conta', 'ContaController@post');
        $router->get('/conta[/{id}]', 'ContaController@get');
        $router->patch('/conta[/{id}]', 'ContaController@patch');
        $router->delete('/conta[/{id}]', 'ContaController@delete');
    });

    $router->group(['namespace' => 'Image'], function () use ($router) {
        $router->post('/image', 'ImageController@post');
    });

    $router->group(['namespace' => 'Item'], function () use ($router) {
        $router->get('/item/instituicao/{id}', 'ItemController@getItensByInsti');
        $router->get('/item', 'ItemController@get');
        $router->get('/item/{id}', 'ItemController@get');
        $router->post('/item', 'ItemController@post');
        $router->patch('/item/{id}', 'ItemController@patch');
        $router->delete('/item/{id}', 'ItemController@delete');
    });

    $router->group(['middleware' => 'jwt.auth'], function () use ($router) {
    });
});
// 
