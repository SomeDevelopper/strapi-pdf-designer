# Introduction

This plugin is a fork of the Strapi Plugin Email Designer. It is used to create a single-one-page PDF using drag-and-drop.

[Strapi-plugin-email-designer](https://www.npmjs.com/package/strapi-plugin-email-designer/v/1.1.2)

## Requirement :
You need a node version between 20.x.x and a Strapi version >= 5.0.0

## Installation

Install the strapi-pdf-designer with node :  
```javascript
npm install strapi-pdf-designer-5@latest
```

Make sure to enable it in the plugin file.

```javascript
return {
    'pdf-designer-5': {
      enabled: true,
    },
}
```

## Usage
First, design your template on the plugin page in your Strapi Panel Admin.

Then call your plugin to generate your pdf :

```javascript
try {
   await strapi
    .plugin('pdf-designer-5')
    .service('pdf')
    .generatePdf(
      {
       templateReferenceId: 1
      },
)
```

If you want to put some data in your pdf, you can do it by adding in your design : {=data.exemple}

Then you can specify your data in the call plugin : 
```javascript
const pdf = await strapi.plugin('pdf-designer-5').service('pdf').generatePdf(
                { templateReferenceId: 1 },
                {
                  data: {
                     exemple: 'Test'
                   }
                },
            )

```

The plugin return a Buffer in base64.
## License

[MIT Licence](https://github.com/SomeDevelopper/strapi-pdf-designer/blob/main/LICENSE.md) and [Strapi solution](https://strapi.io)
