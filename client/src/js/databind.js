/**
 * Created by lhy on 2018/5/20.
 */
//数据绑定
//监听对象的变化
var  obj={name:'ming',age:'24',childs:{child1:{name:'a',age:'1'},child2:{name:'b',age:'2'}}};
observer(obj);
     obj.name='min';
     obj.childs.child1.age='5';
     obj.childs=null;
     console.log(obj.childs);

function observer(obj){
    //判断该属性obj是否需要监听:如果obj为null，undefined或者不是对象则不需要启动监听
    if(!obj || typeof obj !=='object'){
        return;
    }
    //监听当前属性obj并且对其子属性进行递归observer：如果是对象则对每个对象的子属性进行监听
    Object.keys(obj).forEach(function(key){
        //这个非常关键，后面将key改写为访问器属性，如果在访问器属性key的get中返回obj[key]会死循环
        //访问器属性的get不能返回自己，否则出现死循环。
        var oldValue=obj[key];
        //对obj的子属性obj[key]递归observer
        observer(oldValue);
        //通过访问器属性监听当前属性obj
        Object.defineProperty(obj,key,{
            configurabale:false,
            enumerable: true,
            get:function(){
                return oldValue;
            },
            set:function(newValue){
                if(newValue===oldValue)return;
                console.log('change from '+oldValue+' to '+newValue);
                oldValue=newValue;
            }
        });
    })
}

//如果对象的某个属性发生改变，那么一定会调用该属性的set函数，所以在其set函数中将监听到的变化传播出去
// （做的不仅仅是将发生改变这一个消息显示给外界，而应该调用一个函数对外界产生某种改变）
//  简单的：数据绑定通知使用这个对象的所有用户（订阅者）这个值改变了
//  1:需要生成订阅者。2：通知订阅者
function observer(obj){
    //判断该属性obj是否需要监听:如果obj为null，undefined或者不是对象则不需要启动监听
    if(!obj || typeof obj !=='object'){
        return;
    }
    //监听当前属性obj并且对其子属性进行递归observer：如果是对象则对每个对象的子属性进行监听
    Object.keys(obj).forEach(function(key){
        //这个非常关键，后面将key改写为访问器属性，如果在访问器属性key的get中返回obj[key]会死循环
        //访问器属性的get不能返回自己，否则出现死循环。
        var oldValue=obj[key];
        //对obj的子属性obj[key]递归observer
        observer(oldValue);
        //通过访问器属性监听当前属性obj
        Object.defineProperty(obj,key,{
            configurabale:false,
            enumerable: true,
            get:function(){
                return oldValue;
            },
            set:function(newValue){
                if(newValue===oldValue)return;
                oldValue=newValue;

            }
        });
    })
}