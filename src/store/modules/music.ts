import { VuexModule, Module, Action, Mutation, getModule } from "vuex-module-decorators";

import router, { resetRouter } from "@/router";
import { PermissionModule } from "./permission";
import { TagsViewModule } from "./tags-view";
import store from "@/store";

export interface IMusicState {
  audiosPage: IAudiosPage[]
  // musicPage: IMusicPage[]
  musicPage: {
    url: string
    songName: string
    singerName: string
    play: boolean
  }
  musicPlayerState: {
    isPlay: boolean
    muted: boolean
    speed: number
    volume: number
    playIsAll: boolean
  }
  playasb: boolean
  url: string
}

interface IMusicPage {
  url: string
  songName: string
  singerName: string
  play: boolean
}

interface IAudiosPage {
  url: string
  songName: string
  singerName: string
  play: boolean
}

@Module({ dynamic: true, store, name: "music" })
class Music extends VuexModule implements IMusicState {
  public audiosPage = [] // 音乐的内容
  //   public musicPage = []
  // public musicPage: IMusicPage[] = []

  public musicPage = {
    url: "",
    singerName: "",
    songName: "",
    play: false
  }

  public playasb = true;
  public url = "";

  // 当前VueAudio组件音乐控件状态
  public musicPlayerState = {
    isPlay: false, // 该字段是音频是否处于播放状态的属性
    muted: false, // 音频静音控制
    speed: 1, // 快进
    volume: 100, // 音频音量控制
    playIsAll: false // 随机或者单曲
  }

  @Mutation
  private SET_MusicPage(data: any) {
    // console.log(data)
    this.musicPage = data;
  }

  @Mutation
  SET_MUSIC_STATE(play: any) {
    this.playasb = play;
    // console.log(this.playasb)
  }

  @Mutation
  SET_MUSIC_URL(data: any) {
    // console.log(data)
    this.url = data;
    // console.log(this.playasb)
  }

  @Mutation
  SET_AudiosPage(data: any) {
    this.audiosPage = data;
  }

  @Mutation
  SET_MusicPlayerState(data: any) {
    // console.log(data)
    this.musicPlayerState = data;
  }

  @Action
  public async MusicPage(data: any) {
    this.SET_MusicPage(data);
  }

  @Action
  public async AudiosPage(data: any) {
    // console.log(data)
    this.SET_AudiosPage(data);
  }

  @Action
  public async MusicPlayerState(data: any) {
    // console.log(data)
    this.SET_MusicPlayerState(data);
  }
}

  export const MusicModule = getModule(Music);
