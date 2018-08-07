<template>
    <div id="model">
        <iframe src="http://www.manykit.com/model/static/model/fbx/index.html" frameborder="0" v-if="childModelInfo.mimetype == 'fbx'" :data-src="childModelInfo.modelsrc" id="modeliframe"></iframe>
        <iframe src="http://www.manykit.com/model/static/model/stl/index.html" frameborder="0" v-if="childModelInfo.mimetype == 'stl'" :data-src="childModelInfo.modelsrc" id="modeliframe"></iframe>
    </div>
</template>

<script>
export default {
    props:["childModelInfo"],
    data () {
        return {
            
        }
    }
}
</script>

<style lang="less" scoped>
    #model{
        width: 800px;
        height: 500px;
        // background-color: aqua;
        iframe{
            width: 100%;
            height: 100%;
        }
    }
</style>


