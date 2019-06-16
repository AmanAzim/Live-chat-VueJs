<template>
    <div class="container" style="margin-bottom:30px">
        <form v-on:submit.prevent="createMessage">
            <div class="form-group">
                <input type="text" name="messsage" class="form-control" placeholder="Enter message.." v-model="newMessage"/>
                <p class="text-danger" v-if="errorText">{{errorText}}</p>
            </div>
            <button class="btn btn-primary" type="submit" name="action">Submit</button>
        </form>
    </div>
</template>

<script>
    import Fb from '../firebase/index';
    export default {
        props:['name'],
        data(){
            return {
                newMessage:null,
                errorText:null,
            }
        },
        methods:{
            createMessage(){
                if(this.newMessage){
                    Fb.collection("messages").add({
                        message:this.newMessage,
                        name:this.name,
                        timestamp:Date.now()
                    }).then((docRef)=> {
                        console.log("Document written with ID: ", docRef.id);
                    }).catch(error=>{
                        console.log(error);
                    });
                    this.newMessage=null;
                    this.errorText=null;
                }else {
                    this.errorText="A message must be entered first!";
                }
            }
        }
    }
</script>

<style scoped>

</style>
