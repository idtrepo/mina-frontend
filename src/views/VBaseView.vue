<template>
    <header>
        <header>
            <slot name="header"></slot>
        </header>
        <footer>    
            <slot name="header-secundario"></slot>
        </footer>
    </header>
    <section>
        <header>
            <slot name="contenido-header"></slot>
        </header>
        <section>
            <slot name="contenido"></slot>
        </section>
    </section>
    <footer>
        <header>
            <slot name="footer"></slot>
        </header>
        <footer>
            <slot name="footer-secundario"></slot>
        </footer>
    </footer>
</template>