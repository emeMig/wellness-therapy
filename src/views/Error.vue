<template>
  <v-row>
    <v-col cols="12">
      <div class="notfound ma-auto">
        <div class="notfound-404">
          <h3>{{ $t("errors." + error + ".header") }}</h3>
          <h1>
            <span v-for="(char, idx) in error.toString().split('')" :key="idx">{{ char }}</span>
          </h1>
        </div>
        <h2>{{ $t("errors." + error + ".description") }}</h2>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      error: null
    }
  },
  created () {
    // check if the code is given
    if (this.$route.params.code) {
      this.error = this.$route.params.code
    } else {
      // otherwise, by default, show a 404 error
      this.error = 404
    }
  }
}
</script>

<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Montserrat:900');
  @import url('https://fonts.googleapis.com/css?family=Cabin:400,700');

  .notfound {
    max-width: 520px;
    width: 100%;
    line-height: 1.4;
    text-align: center;

    .notfound-404 {
      position: relative;
      height: 240px;
    }

    .notfound-404 h1 {
      font-family: 'Source Sans Pro', sans-serif;
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      font-size: 252px;
      font-weight: 900;
      color: #262626;
      text-transform: uppercase;
      letter-spacing: -40px;
      margin: 0 0 0 -20px;
    }

    .notfound-404 h1 > span {
      text-shadow: -8px 0 0 #fff;
    }

    .notfound-404 h3 {
      font-family: 'Cabin', sans-serif;
      position: relative;
      font-size: 16px;
      font-weight: 700;
      text-transform: uppercase;
      color: #262626;
      margin: 0;
      letter-spacing: 3px;
      padding-left: 6px;
    }

    h2 {
      font-family: 'Source Sans Pro', sans-serif;
      font-size: 20px;
      font-weight: 400;
      text-transform: uppercase;
      color: #000;
      margin-top: 0;
      margin-bottom: 25px;
    }
  }

  @media only screen and (max-width: 767px) {
    .notfound .notfound-404 {
      height: 200px;
    }

    .notfound .notfound-404 h1 {
      font-size: 200px;
    }
  }

  @media only screen and (max-width: 480px) {
    .notfound .notfound-404 {
      height: 162px;
    }

    .notfound .notfound-404 h1 {
      font-size: 162px;
      height: 150px;
      line-height: 162px;
    }

    .notfound h2 {
      font-size: 16px;
    }
  }
</style>
