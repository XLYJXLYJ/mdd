<template>
    <div class="draft">
        <div class="model-content">
            <model class="fl" :childModelInfo="modelInfo"></model>
            <el-upload
                action="/api/material/uploadHeadPortrait"
                :limit="1"
                :data="dataInfo"
                :on-success="success">
                <el-button>上传封面图</el-button>
            </el-upload>
        </div>
        <draft class="fr" @modelInfo="getmodelinfo"></draft>
    </div>
</template>
<script>
import model from '@/components/model/Model';
import draft from '@/components/model/Draft';
export default {
    data () {
        return {
            modelInfo:"",
            dataInfo:{
                state:2,
                id:this.$route.params.id,
            }
        }
    },
    components: {
        model,draft
    },
    methods:{
        getmodelinfo(info) {
            this.modelInfo = info;
        },
        success() {
            this.Message("封面图上传成功","success")
        }
    }
}
</script>
<style lang="less" scoped>
    .draft{
        width: 1200px;
        margin: 0 auto;
        height: 475px;
        padding-top: 95px;
        margin-bottom: 2px;
        .model-content{
            width: 800px;
            height: 50px;
            position: relative;
            display: inline-block;
            button{
                position: absolute;
                right: 10px;
                top: 10px;
            }
        }
    }
</style>


