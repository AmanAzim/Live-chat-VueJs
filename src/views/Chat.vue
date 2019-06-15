<template>
    <div class="container chat">
        <h2 class="text-primary text-center">Real-Time Chat</h2>
        <h5 class="text-secondary text-center">Powered by Vue.js & Firebase</h5>
        <div class="cart">
            <div class="cart-body">
                <p class="text-secondary noMessages" v-if="messages.length===0">[no messages yet!]</p>
                <div class="messages" v-chat-scroll="{always:false, smooth:true}">
                    <div v-for="message in messages" :key="message.id">
                        <span class="text-info">[{{message.name}}]</span>
                        <span>{{message.message}}</span>
                        <span class="text-secondary time">{{message.timeStamp}}</span>
                    </div>
                </div>
            </div>
            <div class="cart-action">
                <CreateMessage :name="name"/>
            </div>
        </div>
    </div>
</template>

<script>
    import CreateMessage from "../components/CreateMessage.vue";
    import Fb from '../firebase/index';
    import moment from "moment";
    export default {
        components:{
            CreateMessage,
        },
        props:['name'],
        data(){
            return {
                messages:[]
            }
        },
        created() {
            let ref=Fb.collection('messages').orderBy('timestamp')//"collection('name_of_collestion')" it will allow us to access the collection of our need

            ref.onSnapshot((snapshot)=>{//will provide the snap shot of the collection stored on Firebase on each update
                snapshot.docChanges().forEach(change=>{//iterating through all the messages collection
                    if(change.type=='added'){//only the newly added message
                        let doc=change.doc;
                        this.messages.push({
                            id:doc.id,
                            name:doc.data().name,
                            message:doc.data().message,
                            timestamp:moment(doc.data().timestamp).format('LTS')//format() Giges the time as string
                        })
                    }
                })
            })
        }
    }
</script>

<style scoped>
    .chat h2{
        font-size: 2.6em;
        margin-bottom: 0px;

    }
    .chat h5{
        margin-top: 0px;
        margin-bottom: 40px;
    }
    .chat span {
        font-size: 1.2em;
    }
    .chat .time{
        display: block;
        font-size: 0.7em;
    }
    .messages {
        max-height: 300px;
        overflow: auto;
    }
</style>
