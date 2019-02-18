cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!',
        ss:{
            default:null,
            type:cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;
        this.pp = null;
    },

    // called every frame
    update: function (dt) {

    },

    jieping(){
        if (!cc.sys.isNative) return;
        let dirpath = jsb.fileUtils.getWritablePath() + 'ScreenShoot/';
        if( !jsb.fileUtils.isDirectoryExist(dirpath)){
            jsb.fileUtils.createDirectory(dirpath);
        }
        let name = 'ScreenShoot-' + (new Date()).valueOf() + '.png';
        let filepath = dirpath + name;
        cc.log("zhangqiang === ceshi --------- ",filepath)
        let size = cc.winSize;
        let rt = cc.RenderTexture.create(size.width, size.height);
        cc.director.getScene()._sgNode.addChild(rt);
        rt.setVisible(false);
        rt.begin();
        cc.director.getScene()._sgNode.visit();
        rt.end();
        rt.saveToFile('ScreenShoot/' + name, cc.IMAGE_FORMAT_PNG);

        this.pp = filepath;
    },

    loadPng(){
        let self = this;
        if( jsb.fileUtils.isFileExist(this.pp) ){
            let filepath = this.pp
            cc.log('zhangqiang  load true  Remote is find' + filepath);
            cc.loader.load(filepath, function(err, tex){
                    if( err ){
                        cc.error(err);
                    }else{
                        var spriteFrame = new cc.SpriteFrame(tex);
                        if( spriteFrame ){
                            spriteFrame.retain();
                            self.ss.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        }
                    }
                });
            return;
        }else{
            cc.log('zhangqiang  load false  Remote is find' + filepath);
        }
    }
});
