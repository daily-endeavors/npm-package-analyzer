<template>
  <div>
    <header class="page-header">
      <section class="result-header--left-section">
        <a href="/">
          <div class="logo-small">
            <span>NPM Package</span>
            <span class="logo-small__alt">Analyzer</span>
          </div>
        </a>
      </section>
      <section class="page-header--right-section">
        <ul class="page-header__quicklinks">
          <li>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://badgen.net/#bundlephobia"
              >Badges</a
            >
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://github.com/sponsors/pastelsky"
              >Sponsor</a
            >
          </li>
          <li>
            <a href="/blog">Blog</a>
          </li>
          <li>
            <a href="/scan">Scan package.json</a>
          </li>
        </ul>
        <a target="_blank" href="https://github.com/pastelsky/bundlephobia">
          <svg width="33" height="33" viewBox="0 0 33 33" class="github-logo">
            <title>Github Link</title>
            <path
              d="M16.6.46C7.6.46.33 7.76.33 16.76c0 7.17 4.67 13.3 11.14 15.43.8.1 1.1-.4 1.1-.8v-2.8c-4.54.9-5.5-2.2-5.5-2.2-.74-1.9-1.8-2.4-1.8-2.4-1.48-1 .1-1 .1-1 1.64.1 2.5 1.7 2.5 1.7 1.45 2.4 3.8 1.7 4.74 1.3.2-1.1.6-1.8 1.1-2.2-3.6-.4-7.4-1.8-7.4-8.1 0-1.8.7-3.28 1.7-4.4-.1-.4-.7-2.1.2-4.3 0 0 1.4-.48 4.5 1.63 1.3-.36 2.7-.54 4.1-.55 1.4 0 2.8.2 4.1.57 3.1-2.1 4.48-1.7 4.48-1.7.9 2.24.33 3.9.17 4.3 1 1.2 1.6 2.64 1.6 4.44 0 6.23-3.8 7.6-7.43 8 .6.5 1.1 1.5 1.1 3.04v4.47c0 .43.27.94 1.1.8 6.45-2.1 11.1-8.2 11.1-15.4 0-9-7.3-16.3-16.3-16.3"
              fill="#161514"
            ></path>
          </svg>
        </a>
      </section>
    </header>
  </div>
</template>
<script lang="ts" setup>
import { Static } from 'vue';
</script>
<style lang="scss" scoped>
@import 'scss-stylesheets/variables.scss';
@import 'scss-stylesheets/colors.scss';
.page-header {
  padding: $global-spacing * 3;
  padding-bottom: $global-spacing * 2;
  display: flex;
  align-items: center;

  @media screen and (max-width: 40em) {
    padding: $global-spacing * 2;
  }
}

.page-header--right-section {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.github-logo {
  width: 30px;
  height: 30px;

  @media screen and (max-width: 40em) {
    width: 20px;
    height: 20px;
  }

  path {
    fill: #666;
    transition: fill 0.2s;
  }

  &:hover {
    path {
      fill: black;
    }
  }
}

.logo-small {
  @include font-size-reg;
  text-transform: uppercase;
  font-weight: $font-weight-very-bold;
  letter-spacing: 3px;
  user-select: none;
  cursor: pointer;
  color: #212121;
}

.logo-small__alt {
  color: #888;
}

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: calc(100vh - 6px);
  flex-grow: 1;
}

.page-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;

  @media screen and (max-width: 40em) {
    padding: 0 $global-spacing * 2;
  }
}

.page-header__quicklinks {
  list-style: none;
  margin: 0 2rem 0 0;
  font-weight: $font-weight-light;
  display: flex;

  a {
    @include font-size-xs;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    font-weight: $font-weight-bold;
    opacity: 0.55;
    color: $raven;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }

  li + li {
    margin-left: $global-spacing * 2;
  }

  @media screen and (max-width: 40em) {
    max-width: 40vw;
    overflow: scroll;
    align-items: center;
    justify-content: flex-end;
    overflow: scroll;
  }
}
</style>
