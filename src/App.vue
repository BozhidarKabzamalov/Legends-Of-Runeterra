<template>
    <div id="app">
        <nav class='header'>
            <div class="wrapper">
                <ul class='navigation'>
                    <router-link to="/" tag='li'>Home</router-link>
                    <router-link to="/cards" tag='li'>Cards Gallery</router-link>
                </ul>
            </div>
        </nav>
        <router-view/>
    </div>
</template>

<style>
    *, *:after, *:before {
        margin: 0;
        padding: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-decoration: none;
        list-style-type: none;
    }
    body {
        font-family: 'Roboto', 'Helvetica', 'Helvetica Neue', 'Arial', sans-serif;
        background-color: #23343E;
        background-color: #0d202b;
        color: hsla(0,0%,100%,.87);
    }
    .wrapper {
        width: 70%;
        margin: 0 auto;
    }
    .responsive-image {
        display: block;
        width: 100%;
        height: 100%;
    }
    .header {
        background-color: #0c1c25;
        border-bottom: 3px solid #1b2d33;
    }
    .navigation {
        font-weight: 500;
        display: flex;
        align-items: center;
    }
    .navigation li {
        padding: 20px;
        cursor: pointer;
    }
    .Noxus {
        color: #ae4b41;
    }
    .Demacia {
        color: #e8e8e1;
    }
    .Ionia {
        color: #c16d89;
    }
    .Freljord {
        color: #5bacd1;
    }
    .ShadowIsles {
        color: #4aa494;
    }
    .PiltoverZaun {
        color: #da996c;
    }
    .Champion {
        color: #ffd300;
    }
    .Epic {
        color: #e881f8;
    }
    .Rare {
        color: #4ba4e4;
    }
    .Common {
        color: #61be42;
    }
</style>
