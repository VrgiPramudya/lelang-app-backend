require('dotenv').config()

const Hapi = require('@hapi/hapi')
const mysql = require('mysql2/promise');
const Jwt = require('@hapi/jwt');

// Plugins
const authPlugin = require('./plugins/auth');
const adminPlugin = require('./plugins/admin');
const userPlugin = require('./plugins/user');
const barangPlugin = require('./plugins/barang');
const lelangPlugin = require('./plugins/lelang');
const penawaranPlugin = require('./plugins/penawaran');
const historyPlugin = require('./plugins/history');
const registerPlugin = require('./plugins/register');

// Service
const AdminServices = require('./services/AdminServices');
const PenawaranServices = require('./services/PenawaranServices');
const UserServices = require('./services/UserServices');
const BarangServices = require('./services/BarangServices');
const LelangServices = require('./services/LelangServices');
const HistoryServices = require('./services/HistoryServices');

// Validator
const TokenManager = require('./tokenize/tokenManager');
const RegisterServices = require('./services/RegisterServices');

const init = async () => {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'virgi2007btg',
        database: 'lelangapp',
        waitForConnections: true,
        connectionLimit: 10,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
        namedPlaceholders: true,
    });

    const adminService = new AdminServices(pool)
    const userService = new UserServices(pool)
    const barangService = new BarangServices(pool)
    const lelangService = new LelangServices(pool)
    const historyService = new HistoryServices(pool)
    const penawaranService = new PenawaranServices(pool)
    const registerService = new RegisterServices(pool)

    const server = Hapi.server({ 
        port: 2000,
        host: `localhost`,
        routes: {
            cors: {
                origin: ['*']
            }
        }
    })

    await server.register([
        {
            plugin: Jwt
        }
    ])

    server.auth.strategy('lelang_jwt', 'jwt', {
        keys: '882cf3826475aeec414d83cfc3d34751051a2ed50e6e4b0190083eae78e01373207dd3e1644c65d5b45b07bf929533e42f0b3901300b87915b5cf604ce0fa061',
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: 86400
        },
        validate: (artifacts) => {
            return {
                isValid: true,
                credentials: {
                    id: artifacts.decoded.payload.id, 
                    role: artifacts.decoded.payload.role
                }
            };
        }
    });
    

    await server.register([
        {
            plugin: registerPlugin,
            options: {
                service: registerService
            }
        },
        {
            plugin: authPlugin,
            options:{
                adminServices: adminService,
                userServices: userService,
                tokenManager: TokenManager
            }
        },
        {
            plugin: adminPlugin,
            options: {
                service: adminService
            }
        },
        {
            plugin: userPlugin,
            options: {
                service: userService
            }
        },
        {
            plugin: barangPlugin,
            options: {
                service: barangService
            }
        },
        {
            plugin: lelangPlugin,
            options: {
                service: lelangService
            }
        },
        {
            plugin: penawaranPlugin,
            options: {
                service: penawaranService
            }
        },
        {
            plugin: historyPlugin,
            options: {
                service: historyService
            }
        }

    ])

    await server.start()

    console.log(`Server berjalan pada ${server.info.uri}`)
}

init()