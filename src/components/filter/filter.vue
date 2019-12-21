<template>
    <div class="filter-template">
        <div class="filter-control" @click.stop="filterOn()" :class="{'filter-on':filterOrSearch === 'filter'}">
            <font-awesome-icon icon="filter" class="icon"></font-awesome-icon>
        </div>
        <div class="filter">
            <transition name='filter-on'>
                <div class="filter-group" v-show="filterOrSearch === 'filter'">
                    <font-awesome-icon icon="stream" class="icon" size="xs"></font-awesome-icon>
                    <button class="gender filter-button" v-b-modal.filter-gender :class="{'selected': selectFilter.gender.length > 0}">{{this.showSelection('gender')}}</button>
                    <button class="region filter-button" v-b-modal.filter-region :class="{'selected': selectFilter.region.length > 0}">{{this.showSelection('region')}}</button>
                    <button class="age filter-button" v-b-modal.filter-age :class="{'selected': (Math.abs(secAge-fstAge) !== (maxAge-minAge))}" v-if="alldata">{{this.showSelection('age')}}</button>
                </div>
            </transition>
            <b-modal centered id="filter-gender" title="select gender" v-model="showGenderFilter">
                <div class="content">
                    <div class="buttons">
                        <button variant="outline-secondary" class="filter-button"  v-for="item in Classify(alldata, 'gender')" :key="item" @click.stop="selectFunc(item ,'gender')" :class="{'selected': selectFilter.gender.includes(item)}">{{item}}</button>
                    </div> 
                </div>
                <div slot="modal-footer">
                    <button class="text" @click.stop="showGenderFilter=false">save</button>
                </div> 
            </b-modal>
            <b-modal centered id="filter-region" title="select region" v-model="showRegionFilter">
                <div class="content">
                    <div class="buttons">
                        <b-button variant="outline-secondary" class="filter-button"  v-for="item in Classify(alldata, 'continent')" :key="item" @click.stop="selectFunc(item, 'region')" :class="{'selected': selectFilter.region.includes(item)}">{{item}}</b-button>
                    </div> 
                </div>
                <div slot="modal-footer">
                    <button class="text" @click.stop="showRegionFilter=false">save</button>
                </div> 
            </b-modal>
            <b-modal centered id="filter-age" title="select age" v-model="showAgeFilter">
                <div class="range-slider">
                    <div class="content">
                        <div class="value-wrapper">
                            {{this.ageValue(0)}}歲
                        </div>
                        <div class="value-wrapper-middle">至</div>
                        <div class="value-wrapper">
                            {{this.ageValue(1)}}歲
                        </div>
                        <input v-model="fstAge" :min="minAge" :max="maxAge" v-on="selectFunc(fstAge, 'age')" step="1" type="range"/>
                        <input v-model="secAge" :min="minAge" :max="maxAge" v-on="selectFunc(secAge, 'age')" step="1" type="range"/>
                    </div>
                </div>
                <div slot="modal-footer">
                    <button class="text" @click.stop="showAgeFilter=false">save</button>
                </div> 
            </b-modal>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                showGenderFilter: false,
                showRegionFilter: false,
                showAgeFilter: false,
                copyOffilterOrSearch: 'search',
                minAge: 0,
                maxAge: 0,
                fstAge: 0,
                secAge: 0,
                selectFilter: {gender: [], region: []},
            }
        },
        props: {
            alldata: {
                type: Array,
                default: () => []
            },
            filterOrSearch: '',
        },
        watch: {
            alldata: function() {
                this.maxAge = Math.max(...this.alldata.map(i => Number(i.age)))
                this.minAge = Math.min(...this.alldata.map(i => Number(i.age)))
                this.fstAge = this.minAge
                this.secAge = this.maxAge 
            },
            filterOrSearch: function () {
                this.copyOffilterOrSearch = this.filterOrSearch
                this.selectFilter = {gender: [], region: []},
                this.maxAge = Math.max(...this.alldata.map(i => Number(i.age)))
                this.minAge = Math.min(...this.alldata.map(i => Number(i.age)))
                this.fstAge = this.minAge
                this.secAge = this.maxAge  
                this.$emit('filterEvent', this.alldata)
                
            }
            
        },
        methods: {
            filterOn() {
                this.selectFilter = {gender: [], region: []},
                this.fstAge = this.minAge
                this.secAge = this.maxAge 
                this.$emit('filterEvent', this.alldata)
                this.copyOffilterOrSearch = this.filterOrSearch
                if (this.copyOffilterOrSearch === 'filter') {
                    this.copyOffilterOrSearch = 'search'
                } else {
                    this.copyOffilterOrSearch = 'filter'
                }
                this.$emit('filterOn', this.copyOffilterOrSearch)
            },
            valueCount: function(arr) {
                const category = {}
                arr.forEach(element => {
                    if (element in category) {
                        category[element] += 1
                    } else {
                        category[element] = 1
                    }
                });
                return category
            },
            Classify (data,type) {
                return Object.keys(this.valueCount(data.map(i => i[type])))
            },
            ageValue(index) {
                const selectAge = [this.fstAge, this.secAge]
                if (this.secAge < this.fstAge) {
                    return selectAge.reverse()[index]
                }
                return selectAge[index]
            },
            selectFunc(item, type) {
                switch(type) {
                    case 'gender': 
                        //單選
                        const indexOfGender = this.selectFilter.gender.indexOf(item)
                        if (indexOfGender !== -1) {
                            this.selectFilter.gender = []
                        } else {
                            this.selectFilter.gender = []
                            this.selectFilter.gender.push(item)
                        }
                        break;
                    case 'region':
                        //多選
                        const indexOfRegion = this.selectFilter.region.indexOf(item)
                        if (indexOfRegion !== -1) {
                            this.selectFilter.region.splice(indexOfRegion, 1)
                        } else {
                            this.selectFilter.region.push(item)
                        }
                        //全選等於不選
                        const numOfRegion = this.Classify(this.alldata, 'continent').length
                        if (this.selectFilter.region.length === numOfRegion){
                            this.selectFilter.region = []
                        }
                        break;
                }
                let filterContent = this.alldata
                Object.keys(this.selectFilter).forEach(key => {
                    if (this.selectFilter[key].length === 0) {
                        return
                    }
                    switch(key) {
                        case 'gender': 
                            filterContent = filterContent.filter(user => this.selectFilter.gender.includes(user.gender))
                            break;
                        case 'region':
                            filterContent = filterContent.filter(user => this.selectFilter.region.includes(user.continent))
                            break;
                    }   
                })
                filterContent = filterContent.filter(user => this.ageValue(0) <= Number(user.age) && this.ageValue(1) >= Number(user.age))
                this.$emit('filterEvent', filterContent)
            },
            showSelection(type) {
                switch (type) {
                    case 'gender': 
                        if (this.selectFilter.gender.length > 0) {
                            return this.selectFilter.gender.join()
                        }
                        return 'gender'
                        break;
                    case 'region': 
                        if (this.selectFilter.region.length === 1) {
                            return this.selectFilter.region.join()
                        } else if (this.selectFilter.region.length > 0) {
                            return `${this.selectFilter.region.length}個地區`
                        }
                        return 'region'
                        break;
                    case 'age':
                        if (Math.abs(this.secAge-this.fstAge) !== (this.maxAge-this.minAge) && this.minAge !== Infinity) {
                            return `${this.ageValue(0)} - ${this.ageValue(1)}歲 `
                        }
                        return 'age'
                        break;
                }            
            },
        },
        computed: {
            
        }
    }
</script>
<style scoped>
    
</style>