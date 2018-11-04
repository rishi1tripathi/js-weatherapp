let events={
    events:{},
    subscribe:function(eventName:string,functionHandler){
    this.events[eventName]=this.events[eventName]||[];
    this.events[eventName].push(functionHandler);
    },
    publish:function(eventName:string,value){
        if(this.events[eventName])
            this.events[eventName].forEach(handler=>handler(value));

    },
    unsubscribe:function(eventName:string,handler){
        let handlerList = this.events[eventName];
        if(handlerList){
            for(let i=0;i<handlerList.length;i++){
                if(handlerList[i]===handler){
                    handlerList.splice(i,1);
                    break;
                }
            }
        }

    }

}
export default events;