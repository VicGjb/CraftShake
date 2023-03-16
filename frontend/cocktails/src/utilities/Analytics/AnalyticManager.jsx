import { AmplitudeClient } from "amplitude-js";
import React from "react";
import amplitude from 'amplitude-js'; 

export class AnalyticManager{
    constructor(){
        this.analyticHandlers = [new AmplitudeAnalyticsHandler(),]
        this.analyticHandlers.forEach(handler => handler.init())
    }

    setUserId(userId){
        this.analyticHandlers.forEach(handler => handler.setUserId(userId))
    }
    
    setUserProperties(properties){
        this.analyticHandlers.forEach(handler => handler.setUserProperties(properties))
    }

    setEventData(eventName, eventProperties){
        this.analyticHandlers.forEach(handler => handler.setEventData(eventName,eventProperties))
    }
}

export class AmplitudeAnalyticsHandler{
    constructor(){
        
    }

    init(){
        amplitude.getInstance().init("bd5dcf70ef3c0cdabb07b58abdb2a5a0");
    }
    setUserId(userId){
        amplitude.getInstance().setUserId(userId);
    }
    
    setUserProperties(properties){
        amplitude.getInstance().setUserProperties(properties);
    }

    setEventData(eventName, eventProperties){
        amplitude.getInstance().logEvent(eventName, eventProperties);
    }
}