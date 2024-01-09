import * as React from 'react';
import {StaticRouter} from 'react-router-dom';
import {StaticRouterContext} from 'react-router';
import * as express from 'express';
import {renderToString} from 'react-dom/server';

import App from './app';
import fetch from "node-fetch";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST || '');
const server = express();

function buildMarkup(url: string) {
    const context: StaticRouterContext = {};
    const markup = renderToString(
        <StaticRouter context={context} location={url}>
            <App/>
        </StaticRouter>
    );
    return {context, markup};
}

function buildHTML(markup: string) {
    // const helmet = Helmet.renderStatic();

    const content = `
    <html lang="">
      <head>
        <title>title</title>
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="1200" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        ${ assets.client.css
            ? `<link rel="stylesheet" type="text/css" href="${assets.client.css}" />`: ''}
        ${process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`}   

      </head>
      <body>
        <main id="P-content">${markup}</main>
        <div id="P-modals"></div>
      </body>
    </html>
  `;

    return content;
}
const idRegex = '([0-9a-zA-Z]*)';
server
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR || ''))
    // .get(`/${idRegex}/products`, async (req, res) => {
    //     const regex = req.path.slice(1,3)
    //     let url = req.path.replace(/\//g, '_')
    //     if (url.slice(-1) === '_') {
    //         url = url.slice(-100, -1)
    //     }
    //     const meta = MetaJson[regex][url]
    //     const { markup} = buildMarkup(req.url);
    //     if (meta) {
    //         const html = buildHTML(
    //             markup,
    //             meta.title,
    //             meta.description,
    //             meta.keywords,
    //             "https://job.am/upload/logo/9938478logo.pngwwfHw%3D&w=1000&q=80",
    //             regex
    //         );
    //         res.status(200).send(html);
    //     }
    // })
    // .get(`/${idRegex}/pharmacies`, async (req, res) => {
    //     const regex = req.path.slice(1, 3)
    //     let url = req.path.replace(/\//g, '_')
    //     if (url.slice(-1) === '_') {
    //         url = url.slice(-100, -1)
    //     }
    //     const meta = MetaJson[regex][url]
    //     const { markup} = buildMarkup(req.url);
    //     if (meta) {
    //         const html = buildHTML(
    //             markup,
    //             meta.title,
    //             meta.description,
    //             meta.keywords,
    //             "https://job.am/upload/logo/9938478logo.pngwwfHw%3D&w=1000&q=80",
    //             regex
    //         );
    //         res.status(200).send(html);
    //     }
    // })
    // .get(`/${idRegex}/clinic`, async (req, res) => {

    //     const regex = req.path.slice(1, 3)
    //     let url = req.path.replace(/\//g, '_')


    //     if (url.slice(-1) === '_') {
    //         url = url.slice(-100, -1)
    //     }
    //     const meta = MetaJson[regex][url]
    //     const { markup} = buildMarkup(req.url);
    //     if (meta) {
    //         const html = buildHTML(
    //             markup,
    //             meta.title,
    //             meta.description,
    //             meta.keywords,
    //             "https://job.am/upload/logo/9938478logo.pngwwfHw%3D&w=1000&q=80",
    //             regex
    //         );
    //         res.status(200).send(html);
    //     }
    // })
    // .get(`/${idRegex}/blogs`, async (req, res) => {

    //     const regex = req.path.slice(1, 3)
    //     let url = req.path.replace(/\//g, '_')


    //     if (url.slice(-1) === '_') {
    //         url = url.slice(-100, -1)
    //     }
    //     const meta = MetaJson[regex][url]
    //     const { markup} = buildMarkup(req.url);
    //     if (meta) {
    //         const html = buildHTML(
    //             markup,
    //             meta.title,
    //             meta.description,
    //             meta.keywords,
    //             "https://job.am/upload/logo/9938478logo.pngwwfHw%3D&w=1000&q=80",
    //             regex
    //         );
    //         res.status(200).send(html);
    //     }
    // })
    // .get(`/${idRegex}/about-us`, async (req, res) => {

    //     const regex = req.path.slice(1, 3)
    //     let url = req.path.replace(/\//g, '_')


    //     if (url.slice(-1) === '_') {
    //         url = url.slice(-100, -1)
    //     }
    //     const meta = MetaJson[regex][url]
    //     const { markup} = buildMarkup(req.url);
    //     if (meta) {
    //         const html = buildHTML(
    //             markup,
    //             meta.title,
    //             meta.description,
    //             meta.keywords,
    //             "https://job.am/upload/logo/9938478logo.pngwwfHw%3D&w=1000&q=80",
    //             regex
    //         );
    //         res.status(200).send(html);
    //     }
    // })
    // .get(`/${idRegex}/news`, async (req, res) => {

    //     const regex = req.path.slice(1, 3)
    //     let url = req.path.replace(/\//g, '_')


    //     if (url.slice(-1) === '_') {
    //         url = url.slice(-100, -1)
    //     }
    //     const meta = MetaJson[regex][url]
    //     const { markup} = buildMarkup(req.url);
    //     if (meta) {
    //         const html = buildHTML(
    //             markup,
    //             meta.title,
    //             meta.description,
    //             meta.keywords,
    //             "https://job.am/upload/logo/9938478logo.pngwwfHw%3D&w=1000&q=80",
    //             regex
    //         );
    //         res.status(200).send(html);
    //     }
    // })
    // .get(`/${idRegex}/vacancies`, async (req, res) => {

    //     const regex = req.path.slice(1, 3)
    //     let url = req.path.replace(/\//g, '_')
    //     if (url.slice(-1) === '_') {
    //         url = url.slice(-100, -1)
    //     }
    //     const meta = MetaJson[regex][url]
    //     const { markup} = buildMarkup(req.url);
    //     if (meta) {
    //         const html = buildHTML(
    //             markup,
    //             meta.title,
    //             meta.description,
    //             meta.keywords,
    //             "https://job.am/upload/logo/9938478logo.pngwwfHw%3D&w=1000&q=80",
    //             regex
    //         );
    //         res.status(200).send(html);
    //     }
    // })
    // .get(`/${idRegex}/faq`, async (req, res) => {
    //     const regex = req.path.slice(1, 3)
    //     let url = req.path.replace(/\//g, '_')
    //     if (url.slice(-1) === '_') {
    //         url = url.slice(-100, -1)
    //     }
    //     const meta = MetaJson[regex][url]
    //     const { markup} = buildMarkup(req.url);
    //     if (meta) {
    //         const html = buildHTML(
    //             markup,
    //             meta.title,
    //             meta.description,
    //             meta.keywords,
    //             "https://job.am/upload/logo/9938478logo.pngwwfHw%3D&w=1000&q=80",
    //             regex
    //         );
    //         res.status(200).send(html);
    //     }
    // })
    // .get(`/${idRegex}/privacy-policy`, async (req, res) => {

    //     const regex = req.path.slice(1, 3)
    //     let url=req.path.replace(/\//g, '_')
    //     if(url.slice(-1) === '_'){
    //         url = url.slice(-100,-1)
    //     }
    //     const meta = MetaJson[regex][url]
    //     const { markup} = buildMarkup(req.url);
    //     if (meta) {
    //         const html = buildHTML(
    //             markup,
    //             meta.title,
    //             meta.description,
    //             meta.keywords,
    //             "https://job.am/upload/logo/9938478logo.pngwwfHw%3D&w=1000&q=80",
    //             regex
    //         );
    //         res.status(200).send(html);
    //     }
    // })
    // .get(`/${idRegex}/terms-of-use`, async (req, res) => {

    //     const regex = req.path.slice(1, 3)
    //     let url=req.path.replace(/\//g, '_')
    //     if(url.slice(-1) === '_'){
    //         url = url.slice(-100,-1)
    //     }
    //     const meta = MetaJson[regex][url]
    //     const { markup} = buildMarkup(req.url);
    //     if (meta) {
    //         const html = buildHTML(
    //             markup,
    //             meta.title,
    //             meta.description,
    //             meta.keywords,
    //             "https://job.am/upload/logo/9938478logo.pngwwfHw%3D&w=1000&q=80",
    //             regex
    //         );
    //         res.status(200).send(html);
    //     }
    // })
    // .get(`/${idRegex}/tenders`, async (req, res) => {

    //     const regex = req.path.slice(1, 3)
    //     let url=req.path.replace(/\//g, '_')
    //     if(url.slice(-1) === '_'){
    //         url = url.slice(-100,-1)
    //     }
    //     const meta = MetaJson[regex][url]

    //     const { markup} = buildMarkup(req.url);
    //     if (meta) {
    //         const html = buildHTML(
    //             markup,
    //             meta.title,
    //             meta.description,
    //             meta.keywords,
    //             "https://job.am/upload/logo/9938478logo.pngwwfHw%3D&w=1000&q=80",
    //             regex
    //         );
    //         res.status(200).send(html);
    //     }
    // })
    // .get(`/${idRegex}/card-info`, async (req, res) => {

    //     const regex = req.path.slice(1, 3)
    //     let url=req.path.replace(/\//g, '_')
    //     if(url.slice(-1) === '_'){
    //         url = url.slice(-100,-1)
    //     }
    //     const meta = MetaJson[regex][url]
    //     const { markup} = buildMarkup(req.url);

    //     if (meta) {
    //         const html = buildHTML(
    //             markup,
    //             meta.title,
    //             meta.description,
    //             meta.keywords,
    //             "https://job.am/upload/logo/9938478logo.pngwwfHw%3D&w=1000&q=80",
    //             regex
    //         );
    //         res.status(200).send(html);
    //     }
    // })
    // .get(`/${idRegex}/how-to-order-online`, async (req, res) => {
    //     const regex = req.path.slice(1, 3)
    //     let url=req.path.replace(/\//g, '_')
    //     if(url.slice(-1) === '_'){
    //         url = url.slice(-100,-1)
    //     }
    //     const meta = MetaJson[regex][url]
    //     const { markup} = buildMarkup(req.url);
    //     if (meta) {
    //         const html = buildHTML(
    //             markup,
    //             meta.title,
    //             meta.description,
    //             meta.keywords,
    //             "https://job.am/upload/logo/9938478logo.pngwwfHw%3D&w=1000&q=80",
    //             regex
    //         );
    //         res.status(200).send(html);
    //     }
    // })
    // .get(`/${idRegex}/products/details/:id/:slug`, async (req, res) => {

    //     const {context, markup} = buildMarkup(req.url);
    //     if (context.url) res.redirect(context.url);

    //     else {
    //         const result = await ProductController.ServerDetails(req.params.id);
    //         if (result.success) {

    //             // const tagReplaceRegex = /<[^>]+>/g;
    //             // const desc = result.data.description.replace(tagReplaceRegex, '');
    //             // const formattedDesc = desc.length > 160 ? `${desc.substr(0, 157)}...` : desc;


    //             const html = buildHTML(
    //                 markup,
    //                 `AlfaPharm: ${result.data.title}`,
    //                 `${result.data.title}`,
    //                 `Product Medicine Pharmacy ${result.data.title}`,
    //                 result.data.images ? result.data.images[0].path : ''
    //             );

    //             res.status(200).send(html);
    //         } else {
    //             // tslint:disable-next-line:no-shadowed-variable
    //             componentDidMount((data: any) => {
    //                 const html = buildHTML(
    //                     markup,
    //                     data.data.title,
    //                     data.data.description,
    //                     data.data.keywords,
    //                     data.data.images[0].path
    //                 );
    //                 res.status(200).send(html);
    //             }, req.params.id)
    //         }
    //     }
    // })
    // .get(`/${idRegex}/blogs/:id/:slug`, async (req, res) => {
    //     const {context, markup} = buildMarkup(req.url);
    //     if (context.url) res.redirect(context.url);

    //     else {
    //             componentDidMountBlog((data: any) => {
    //                 const html = buildHTML(
    //                     markup,
    //                     data.data.title+' | NataliPharm',
    //                     data.data.metaDescription+' | NataliPharm',
    //                     data.data.metaKeyword,
    //                     data.data.images[0].path,
    //                     req.path.slice(1,3)
    //                 );
    //                 res.status(200).send(html);
    //             }, req.params.id)
    //     }
    // })
    // .get(`/${idRegex}/faq/:id/:slug`, async (req, res) => {
    //     const {context, markup} = buildMarkup(req.url);
    //     if (context.url) res.redirect(context.url);

    //     else {
    //             componentDidMountFaq((data: any) => {
    //                 const html = buildHTML(
    //                     markup,
    //                     data.data.title,
    //                     data.data.title,
    //                     data.data.keywords,
    //                     data.data.images ? data.data.images[0].path : '',
    //                     req.path.slice(1,3)
    //                 );
    //                 res.status(200).send(html);
    //             }, req.params.id)
    //     }
    // })
    // .get(`/${idRegex}/news/:id`, async (req, res) => {
    //     const {context, markup} = buildMarkup(req.url);
    //     if (context.url) res.redirect(context.url);
    //     else {
    //         componentDidMountNews((data: any) => {
    //             const html = buildHTML(
    //                     markup,
    //                     data.data.title+' | NataliPharm',
    //                     data.data.shortDescription+' | NataliPharm',
    //                     data.data.title+' | NataliPharm',
    //                     data.data.images ? data.data.images[0].path : '',
    //                     req.path.slice(1,3)
    //                 );
    //                 res.status(200).send(html);
    //             }, req.params.id)
    //     }
    // })
    // .get(`/${idRegex}/vacancies/:id/:slug`, async (req, res) => {
    //     const {context, markup} = buildMarkup(req.url);
    //     if (context.url) res.redirect(context.url);
    //     else {
    //         componentDidMountVacancies((data: any) => {
    //             const html = buildHTML(
    //                 markup,
    //                 data.data.name,
    //                 data.data.name,
    //                 data.data.keywords,
    //                 data.data.image,
    //                 req.path.slice(1,3)
    //             );


    //             res.status(200).send(html);
    //         }, req.params.id)
    //     }
    // })
    .get('/*', (req, res) => {
        const regex = req.path.slice(1, 3)
        const {context, markup} = buildMarkup(req.url);

        const html = buildHTML(
            markup
        );
        return res.status(200).send(html);
        // if (regex.length===2 && (regex==='hy' || regex==='ru' || regex==='en')){
        //     let url = req.path.replace(/\//g, '_')
        //     if (url.slice(-1) === '_') {
        //         url = url.slice(-100, -1)
        //     }
        //     const meta = MetaJson[regex][url]
        //     if (meta) {
        //         const html = buildHTML(
        //             markup
        //         );
        //         res.status(200).send(html);
        //     }else{
        //         const html = buildHTML(
        //             markup
        //         );
        //         res.status(200).send(html);
        //     }
        // } else{
        //     const urlForErr=req.path.slice(4,20);
        //     const lang=req.path.slice(1,3);
        //     let search=false;
        //     if (context.url) res.redirect(context.url);

        //     else {
        //         componentDidMount((data: any) => {
        //             const html = buildHTML(
        //                 markup
        //             );
        //             RouteService.subscribeUnauthorized(routes => routes.map(item => {
        //                 const currItem=item.path.slice(4,20).split('/:')[0];
        //                 if(currItem.includes(urlForErr) && currItem.length===urlForErr.length && ((lang==='ru' || lang==='hy'|| lang==='en') && req.path.slice(3,4)==='/') ){
        //                     search=true
        //                 }

        //                 if (req.path==='/'){search=true}

        //             }));
        //             if (search){res.status(200).send(html)
        //             }else{
        //                 res.status(404).send(html);
        //             }

        //         }, req.params.id)
        //     }
        // }

    });
export default server;

