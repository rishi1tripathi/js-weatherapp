let events={
    events:{},
    subscribe:function(eventName,functionHandler){
    this.events[eventName]=this.event[eventName]||[];
    this.events[eventName].push(functionHandler);
    },
    publish:function(eventName,value){
        if(this.events[eventName])
            this.events[eventName].forEach(handler=>handler(value));

    },
    unsubscribe:function(eventName,handler){
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