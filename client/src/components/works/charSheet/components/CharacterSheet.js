import React, { Component } from 'react'
import CharacterRow from "./CharacterRow.js";
import DefenseRow from "./DefenseRow.js";
import SkillRow from "./SkillRow.js";
import WeaponRow from "./WeaponRow.js";
import GeneralRow from "./GeneralRow.js";
var state;

export default class CharacterSheet extends Component {
    
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onChangeStats = this.onChangeStats.bind(this);
        this.onChangeDef = this.onChangeDef.bind(this);
        this.onChangeSkill = this.onChangeSkill.bind(this);
        this.onChangeWeapon = this.onChangeWeapon.bind(this);
        this.removeWeapon = this.removeWeapon.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onChangeItem = this.onChangeItem.bind(this);
    }
    onChange(event, key) {
        this.setState( {
            [key] : event
        });
        this.state.header[key] = event;
        localStorage.setItem("sagaChar", JSON.stringify(this.state.__proto__));
    }
    onChangeStats(event, key) {
        var num = this.makeInt(event);
        this.setState( {
            [key] : num
        });
        this.state.stats[key] = num;
        localStorage.setItem("sagaChar", JSON.stringify(this.state.__proto__));    
    }
    onChangeDef(event, key) {
        var num = this.makeInt(event);
        this.setState( {
            [key] : num
        });
        this.state.stats.defense[key] = num;
        localStorage.setItem("sagaChar", JSON.stringify(this.state.__proto__));

    };
    onChangeSkill(event, key, index) {
        var num = this.makeInt(event);
        this.setState( {
            [key] : num
        });
        this.state.skills[index].skill[key] = num;
        localStorage.setItem("sagaChar", JSON.stringify(this.state.__proto__));

    };
    onChangeWeapon(event, key, index) {
        this.setState( {
            [key] : event
        });
        this.state.weapons[index].weapon[key] = event;
        localStorage.setItem("sagaChar", JSON.stringify(this.state.__proto__));

    };
    makeInt(num){
        return parseInt(num) || 0;
    };
    renderSkills(skills) {
        var skillSet = [];
        for(var i = 0; i < skills.length; i++){
            var skill = skills[i].skill;
            skillSet.push(
                <SkillRow name={skill.name} modifier={this.state.stats[skill.abilityMod]} change={this.onChangeSkill} trained={skill.trained} focus={skill.skillFocus} misc={skill.misc} index={i} level={this.state.header.level}/>
            );
        }
        return skillSet;
    };
    addWeapon(e) {
        e.preventDefault();
        this.setState({});
        this.state.weapons.push({"weapon":{"name": "", "atk":0, "damage":0, "crit":0, "type":"", "notes":""}});
        localStorage.setItem("sagaChar", JSON.stringify(this.state.__proto__));
    };
    renderWeapons(weapons){
        var weaponSet = [];
        for(var i = 0; i < weapons.length; i++){
            var weapon = weapons[i].weapon;
            weaponSet.push(
                <WeaponRow name={weapon.name} index={i} attack={this.state.stats.baseAttack} damage={weapon.damage} crit={weapon.crit} type={weapon.type} notes={weapon.notes} change={this.onChangeWeapon} remove={this.removeWeapon}/>
            );
        }
        return weaponSet;
    };
    removeWeapon(e, index){
        e.preventDefault();
        this.setState({});
        this.state.weapons.splice(index, 1);
        localStorage.setItem("sagaChar", JSON.stringify(this.state.__proto__));
    };
    renderGeneral(array, name){
        var set = [];
        for(var i = 0; i < array.length; i++){
            var item = array[i].eq;
            set.push(
                <GeneralRow name={item.name} weight={item.weight} index={i} change={this.onChangeItem} remove={this.removeItem} id={name}/>
            );
        }
        return set;
    };
    removeItem(e, index, item){
        e.preventDefault();
        this.setState();
        this.state[item].splice(index, 1);
        localStorage.setItem("sagaChar", JSON.stringify(this.state.__proto__));
    };
    addItem(e, item) {
        e.preventDefault();
        this.setState();
        this.state[item].push({"eq": {"name":"", "weight":0}});
        localStorage.setItem("sagaChar", JSON.stringify(this.state.__proto__));
    };
    onChangeItem(event, key, index, item) {
        this.setState( {
            [key] : event
        });
        this.state[item][index].eq[key] = event;
        localStorage.setItem("sagaChar", JSON.stringify(this.state.__proto__));

    };
    render() {
        this.state = Object.create(this.props.character);
        var skillsRendered = this.renderSkills(this.state.skills);
        var weaponsRendered = this.renderWeapons(this.state.weapons);
        var featsRendered = this.renderGeneral(this.state.feats, "feats");
        var actionsRendered = this.renderGeneral(this.state.specialCombatActions, "specialCombatActions");
        var equipmentRendered = this.renderGeneral(this.state.equipment, "equipment");
        var forceRendered = this.renderGeneral(this.state.forcePowers, "forcePowers");
        var talentsRendered = this.renderGeneral(this.state.talents, "talents");
        var languagesRendered = this.renderGeneral(this.state.languages, "languages");
        return(
            <form className="characterForm">
                    <div className="row row-margin">
                        <div className="col-md-12">                            
                            <div className="col-md-5">
                                <CharacterRow default={this.state.header.name}  onBlur={this.onChange}  width="10" label="Name" placeholder="Character Name" id="name" type="text" />
                            </div>
                            <div className="col-md-4">
                                <CharacterRow default={this.state.header.player} onBlur={this.onChange} width="10" label="Player" placeholder="Player Name" id="player" type="text"/>
                            </div>
                            <div className="col-md-3">
                                <CharacterRow default={this.state.header.age} onBlur={this.onChange} width="10" label="Age" placeholder="age" id="age" type="text"/>
                            </div>                               
                        </div>                
                    </div>
                    <div className="row row-margin">
                        <div className="col-md-12">                            
                            <div className="col-md-5">
                                <CharacterRow default={this.state.header.class} onBlur={this.onChange} width="10" label="Class" placeholder="Class" id="class" type="text"/>
                            </div>
                            <div className="col-md-4">
                                <CharacterRow default={this.state.header.species} onBlur={this.onChange} width="10" label="Species" placeholder="Species" id="species" type="text"/>
                            </div>  
                            <div className="col-md-3">
                                <CharacterRow default={this.state.header.level} onBlur={this.onChange} width="10" label="Level" placeholder="Level" id="level" type="text"/>
                            </div>                            
                        </div>                
                    </div>
                    <div className="row row-margin">
                        <div className="col-md-12">                            
                            <div className="col-md-3">
                                <CharacterRow default={this.state.header.gender} onBlur={this.onChange} width="9" label="Gender" placeholder="Gender" id="gender" type="text"/>
                            </div>
                            <div className="col-md-3">
                                <CharacterRow default={this.state.header.height} onBlur={this.onChange} width="9" label="Height" placeholder="Height" id="height" type="text"/>
                            </div>  
                            <div className="col-md-3">
                                <CharacterRow default={this.state.header.weight} onBlur={this.onChange} width="9" label="Weight" placeholder="Weight" id="weight" type="text"/>
                            </div>
                            <div className="col-md-3">
                                <CharacterRow default={this.state.header.destiny} onBlur={this.onChange} width="9" label="Destiny" placeholder="Destiny" id="destiny" type="text"/>
                            </div>                             
                        </div>                
                    </div>
                    <div className="statsArea">
                        <div className="row row-margin">
                            <div className="col-md-12">    
                                <div className="col-md-3">
                                    <label className="headline-label col-xs-12" htmlFor="name">SCORE</label>
                                </div>
                                <div className="col-md-1">
                                    <label className="headline-label col-xs-12" htmlFor="name">MODIFIER</label>
                                </div>
                                <div className="col-md-4">
                                    <label className="headline-label col-xs-12" htmlFor="name">HIT POINTS</label>
                                </div>    
                                <div className="col-md-4">
                                    <label className="headline-label col-xs-12" htmlFor="name"></label>
                                </div>                          
                            </div>                
                        </div>
                        <div className="row row-margin">
                            <div className="col-md-12">    
                                <div className="col-md-3">
                                    <CharacterRow default={this.state.stats.strength} onBlur={this.onChangeStats} width="5" label="STRength" id="strength" type="tel"/>
                                </div>
                                <div className="col-md-1 modifier">
                                    <input type="text" className="form-control" value={this.state.stats.strModifier} onChange={e => this.onChangeStats(e.target.value, "strModifier")} id="strmodifier" name="strModifier" />
                                </div>
                                <div className="col-md-4">
                                    <CharacterRow default={this.state.stats.hitPoints} onBlur={this.onChangeStats} width="5" label="Total" id="hitPoints" />
                                </div>    
                                <div className="col-md-3">
                                    <CharacterRow default={this.state.stats.speed} onBlur={this.onChangeStats} width="6" label="Speed" id="speed" />
                                </div>                          
                            </div>                
                        </div>
                        <div className="row row-margin">
                            <div className="col-md-12">    
                                <div className="col-md-3">
                                    <CharacterRow default={this.state.stats.dexterity} onBlur={this.onChangeStats} width="5" label="DEXterity" id="dexterity" />
                                </div>
                                <div className="col-md-1 modifier">
                                    <input type="text" className="form-control" value={this.state.stats.dexModifier} onChange={e => this.onChangeStats(e.target.value, "dexModifier")} id="dexmodifier" name="dexModifier" />
                                </div>
                                <div className="col-md-4">
                                    <CharacterRow default={this.state.stats.currentHP} onBlur={this.onChangeStats} width="5" label="Current" id="currentHP" />
                                </div>    
                                <div className="col-md-3">
                                    <CharacterRow default={this.state.stats.darkSide} onBlur={this.onChangeStats} width="5" label="Dark Side Score" id="darkSide" />
                                </div>                          
                            </div>                
                        </div>
                        <div className="row row-margin">
                            <div className="col-md-12">    
                                <div className="col-md-3">
                                    <CharacterRow default={this.state.stats.constitution} onBlur={this.onChangeStats} width="5" label="CONstitution" id="constitution" />
                                </div>
                                <div className="col-md-1 modifier">
                                    <input type="text" className="form-control" value={this.state.stats.conModifier} onChange={e => this.onChangeStats(e.target.value, "conModifier")} id="conmodifier" name="conModifier" />
                                </div>
                                <div className="col-md-4">
                                    <CharacterRow default={this.state.stats.defense.fortitude} onBlur={this.onChangeDef} width="5" label="Fort Defense" id="fortitude" />
                                </div>    
                                <div className="col-md-3">
                                    <CharacterRow default={this.state.stats.credits} onBlur={this.onChangeStats} width="6" label="Credits" id="credits" />
                                </div>                          
                            </div>                
                        </div>
                        <div className="row row-margin">
                            <div className="col-md-12">    
                                <div className="col-md-3">
                                    <CharacterRow default={this.state.stats.intelligence} onBlur={this.onChangeStats} width="5" label="INTelligence" id="intelligence" />
                                </div>
                                <div className="col-md-1 modifier">
                                    <input type="text" className="form-control" value={this.state.stats.intModifier} onChange={this.onChangeStats} onChange={e => this.onChangeStats(e.target.value, "intModifier")} id="intmodifier" name="intModifier" />
                                </div>
                                <div className="col-md-4">
                                    <CharacterRow default={this.state.stats.miscBonus} onBlur={this.onChangeStats} width="5" label="Misc Bonus" id="miscBonus" />
                                </div>    
                                <div className="col-md-3">
                                    <CharacterRow default={this.state.stats.baseAttack} onBlur={this.onChangeStats} width="6" label="Base Attack" id="baseAttack" />
                                </div>                          
                            </div>                
                        </div>
                        <div className="row row-margin">
                            <div className="col-md-12">    
                                <div className="col-md-3">
                                    <CharacterRow default={this.state.stats.wisdom} onBlur={this.onChangeStats} width="5" label="WISdom" id="wisdom" />
                                </div>
                                <div className="col-md-1 modifier">
                                    <input type="text" className="form-control" value={this.state.stats.wisModifier} id="wisModifier" onChange={e => this.onChangeStats(e.target.value, "wisModifier")} name="wisModifier" />
                                </div>
                                <div className="col-md-4">
                                    <CharacterRow default={parseInt(this.state.stats.defense.fortitude) + parseInt(this.state.stats.miscBonus)} width="5" label="Damage Threshold" />
                                </div>    
                                <div className="col-md-3">
                                    <CharacterRow default={this.state.stats.forcePoints} onBlur={this.onChangeStats} width="6" label="Force Points" id="forcePoints" />
                                </div>                          
                            </div>                
                        </div>
                        <div className="row row-margin">
                            <div className="col-md-12">    
                                <div className="col-md-3">
                                    <CharacterRow default={this.state.stats.charisma} onBlur={this.onChangeStats} width="5" label="CHArisma" id="charisma" id="charisma" />
                                </div>
                                <div className="col-md-1 modifier">
                                    <input type="text" className="form-control" value={this.state.stats.chaModifier} onChange={e => this.onChangeStats(e.target.value, "chaModifier")} id="chaModifier" name="chaModifier" />
                                </div>
                                <div className="col-md-4">
                                    
                                </div>    
                                <div className="col-md-3">
                                    <CharacterRow default={this.state.stats.destinyPoints} onBlur={this.onChangeStats} width="6" label="Destiny Points" id="destinyPoints" />
                                </div>                          
                            </div>                
                        </div>
                    </div>
                    <div className="conditionArea">
                        <div className="row row-margin">
                            <div className="col-md-12"> 
                                    <label className="headline-label condition" htmlFor="name">CONDITION</label>                                                 
                            </div>                
                        </div>
                        <div className="row row-margin">
                            <div className="col-md-12">    
                                <div className="col-md-2">
                                    <input type="radio" name="condition" value="1" checked={this.state.stats.condition == 1} onChange={e => this.onChangeStats(e.target.value, "condition")}/> Normal
                                </div>
                                <div className="col-md-2">
                                    <input type="radio" name="condition" value="2" checked={this.state.stats.condition == 2} onChange={e => this.onChangeStats(e.target.value, "condition")}/> -1 to all Def, Attacks, Skill, ability Checks
                                </div>
                                <div className="col-md-2">
                                    <input type="radio" name="condition" value="3" checked={this.state.stats.condition == 3} onChange={e => this.onChangeStats(e.target.value, "condition")}/> -2 to all Def, Attacks, Skill, ability Checks
                                </div>    
                                <div className="col-md-2">
                                    <input type="radio" name="condition" value="4" checked={this.state.stats.condition == 4} onChange={e => this.onChangeStats(e.target.value, "condition")}/> -5 to all Def, Attacks, Skill, ability Checks
                                </div>
                                <div className="col-md-2">
                                    <input type="radio" name="condition" value="5" checked={this.state.stats.condition == 5} onChange={e => this.onChangeStats(e.target.value, "condition")}/> -10 to all Def, Attacks, Skill, ability Checks
                                </div>    
                                <div className="col-md-2">
                                    <input type="radio" name="condition" value="6"checked={this.state.stats.condition == 6} onChange={e => this.onChangeStats(e.target.value, "condition")}/> HELPLESS
                                </div>                          
                            </div>                
                        </div>
                    </div>
                    <div className="defenseArea">
                        <div className="row row-margin">
                            <div className="col-md-12"> 
                                    <label className="headline-label condition" htmlFor="name">DEFENSE</label>                                                 
                            </div>                
                        </div>
                        <div className="row row-margin">
                            <div className="col-md-12">    
                                <div className="col-md-2">
                                    <label className="headline-label col-xs-12" htmlFor="name"></label>
                                </div>
                                <div className="col-md-2">
                                    <label className="headline-label col-xs-12" htmlFor="name">TOTAL</label>
                                </div>
                                <div className="col-md-2">
                                    <label className="headline-label col-xs-12" htmlFor="name">LEVEL OR ARMOR</label>
                                </div>    
                                <div className="col-md-2">
                                    <label className="headline-label col-xs-12" htmlFor="name">CLASS BONUS</label>
                                </div> 
                                <div className="col-md-2">
                                    <label className="headline-label col-xs-12" htmlFor="name">ABILITY MOD</label>
                                </div>
                                <div className="col-md-2">
                                    <label className="headline-label col-xs-12" htmlFor="name">MISC</label>
                                </div>                         
                            </div>                
                        </div>
                        <div className="row row-margin">
                            <div className="col-md-12"> 
                                <DefenseRow label="FORT" level={this.state.stats.levelOrArmorFort} classbonus={this.state.stats.classBonusFort} onBlur={this.onChangeStats} misc={this.state.stats.miscFort} id="Fort" ability={this.state.stats.conModifier}/>   
                            </div>
                        </div>
                        <div className="row row-margin">
                            <div className="col-md-12"> 
                                <DefenseRow label="REF" level={this.state.stats.levelOrArmorRef} classbonus={this.state.stats.classBonusRef} onBlur={this.onChangeStats} misc={this.state.stats.miscRef} id="Ref" ability={this.state.stats.dexModifier}/>   
                            </div>
                        </div>
                        <div className="row row-margin">
                            <div className="col-md-12"> 
                                <DefenseRow label="WILL" level={this.state.stats.levelOrArmorWill} classbonus={this.state.stats.classBonusWill} onBlur={this.onChangeStats} misc={this.state.stats.miscWill} id="Will" ability={this.state.stats.wisModifier}/>   
                            </div>
                        </div>
                    </div>
                    <div className="skillsArea">
                        <div className="row row-margin">
                            <div className="col-md-12"> 
                                    <label className="headline-label condition" htmlFor="name">SKILLS</label>                                                 
                            </div>                
                        </div>
                        <div className="row row-margin">
                            <div className="col-md-12">    
                                <div className="col-md-2">
                                    <label className="headline-label col-xs-12" htmlFor="name"></label>
                                </div>
                                <div className="col-md-2">
                                    <label className="headline-label col-xs-12" htmlFor="name">TOTAL</label>
                                </div>
                                <div className="col-md-2">
                                    <label className="headline-label col-xs-12" htmlFor="name">ABILITY MODIFIER</label>
                                </div>    
                                <div className="col-md-2">
                                    <label className="headline-label col-xs-12" htmlFor="name">TRAINED</label>
                                </div> 
                                <div className="col-md-2">
                                    <label className="headline-label col-xs-12" htmlFor="name">SKILL FOCUS</label>
                                </div>
                                <div className="col-md-2">
                                    <label className="headline-label col-xs-12" htmlFor="name">MISC</label>
                                </div>                         
                            </div>                
                        </div>
                        <div className="row row-margin">
                            <div className="col-md-12"> 
                                {skillsRendered}
                            </div>
                        </div>
                    </div>
                    <div className="weaponsArea">
                        <div className="row row-margin">
                            <div className="col-md-4"> 
                                    <label className="headline-label condition" htmlFor="name">WEAPONS</label>                                                 
                            </div> 
                            <div className="col-md-8"> 
                                    <button className="addButton" onClick={e => this.addWeapon(e)}>Add Weapon</button>                                            
                            </div>                
                        </div>
                        <div className="row row-margin">
                            <div className="col-md-12">    
                                <div className="col-md-2">
                                    <label className="headline-label col-xs-12" htmlFor="name">WEAPON</label>
                                </div>
                                <div className="col-md-1">
                                    <label className="headline-label col-xs-12" htmlFor="name">ATTACK</label>
                                </div>
                                <div className="col-md-1">
                                    <label className="headline-label col-xs-12" htmlFor="name">DAMAGE</label>
                                </div>    
                                <div className="col-md-2">
                                    <label className="headline-label col-xs-12" htmlFor="name">CRIT</label>
                                </div> 
                                <div className="col-md-2">
                                    <label className="headline-label col-xs-12" htmlFor="name">TYPE</label>
                                </div>
                                <div className="col-md-2">
                                    <label className="headline-label col-xs-12" htmlFor="name">NOTES</label>
                                </div> 
                                <div className="col-md-2">
                                    <label className="headline-label col-xs-12" htmlFor="name"></label>
                                </div>                         
                            </div>                
                        </div>
                        <div className="row row-margin">
                            <div className="col-md-12"> 
                                {weaponsRendered}
                            </div>
                        </div>
                    </div>
                    <div className="row row-margin">
                        <div className="col-md-3"> 
                                <label className="headline-label condition" htmlFor="name">Feats</label>                                                 
                        </div> 
                        <div className="col-md-3"> 
                                <button className="addButton" onClick={e => this.addItem(e, "feats")}>Add Feat</button>                                            
                        </div> 
                            <div className="col-md-3"> 
                                <label className="headline-label condition" htmlFor="name">Special Combat Actions</label>                                                 
                        </div> 
                        <div className="col-md-3"> 
                                <button className="addButton" onClick={e => this.addItem(e, "specialCombatActions")}>Add Action</button>                                            
                        </div>               
                    </div>
                        <div className="row row-margin">
                        <div className="col-md-12">    
                            <div className="col-md-4">
                                <label className="headline-label col-xs-12" htmlFor="name">FEAT</label>
                            </div>
                            <div className="col-md-1">
                                <label className="headline-label col-xs-12" htmlFor="name">PG</label>
                            </div>
                            <div className="col-md-1">
                                <label className="headline-label col-xs-12" htmlFor="name"></label>
                            </div>
                            <div className="col-md-4">
                                <label className="headline-label col-xs-12" htmlFor="name">ACTION</label>
                            </div>    
                            <div className="col-md-1">
                                <label className="headline-label col-xs-12" htmlFor="name">PG</label>
                            </div>  
                            <div className="col-md-1">
                                <label className="headline-label col-xs-12" htmlFor="name"></label>
                            </div>                  
                        </div>                
                    </div>
                    <div className="row row-margin">
                        <div className="col-md-6"> 
                            {featsRendered}
                        </div>
                            <div className="col-md-6"> 
                            {actionsRendered}
                        </div>
                    </div>
                    <div className="row row-margin">
                        <div className="col-md-3"> 
                                <label className="headline-label condition" htmlFor="name">Equipment</label>                                                 
                        </div> 
                        <div className="col-md-3"> 
                                <button className="addButton" onClick={e => this.addItem(e, "equipment")}>Add </button>                                            
                        </div> 
                            <div className="col-md-3"> 
                                <label className="headline-label condition" htmlFor="name">Force Powers</label>                                                 
                        </div> 
                        <div className="col-md-3"> 
                                <button className="addButton" onClick={e => this.addItem(e, "forcePowers")}>Add </button>                                            
                        </div>               
                    </div>
                        <div className="row row-margin">
                        <div className="col-md-12">    
                            <div className="col-md-4">
                                <label className="headline-label col-xs-12" htmlFor="name">EQUIPMENT</label>
                            </div>
                            <div className="col-md-1">
                                <label className="headline-label col-xs-12" htmlFor="name">WEIGHT</label>
                            </div>
                            <div className="col-md-1">
                                <label className="headline-label col-xs-12" htmlFor="name"></label>
                            </div>
                            <div className="col-md-4">
                                <label className="headline-label col-xs-12" htmlFor="name">POWER</label>
                            </div>    
                            <div className="col-md-1">
                                <label className="headline-label col-xs-12" htmlFor="name"></label>
                            </div>  
                            <div className="col-md-1">
                                <label className="headline-label col-xs-12" htmlFor="name"></label>
                            </div>                  
                        </div>                
                    </div>
                    <div className="row row-margin">
                        <div className="col-md-6"> 
                            {equipmentRendered}
                        </div>
                            <div className="col-md-6"> 
                            {forceRendered}
                        </div>
                    </div>
                    <div className="row row-margin">
                        <div className="col-md-3"> 
                                <label className="headline-label condition" htmlFor="name">Talents</label>                                                 
                        </div> 
                        <div className="col-md-3"> 
                                <button className="addButton" onClick={e => this.addItem(e, "talents")}>Add </button>                                            
                        </div> 
                            <div className="col-md-3"> 
                                <label className="headline-label condition" htmlFor="name">Languages</label>                                                 
                        </div> 
                        <div className="col-md-3"> 
                                <button className="addButton" onClick={e => this.addItem(e, "languages")}>Add </button>                                            
                        </div>               
                    </div>
                        <div className="row row-margin">
                        <div className="col-md-12">    
                            <div className="col-md-4">
                                <label className="headline-label col-xs-12" htmlFor="name">TALENTS</label>
                            </div>
                            <div className="col-md-1">
                                <label className="headline-label col-xs-12" htmlFor="name"></label>
                            </div>
                            <div className="col-md-1">
                                <label className="headline-label col-xs-12" htmlFor="name"></label>
                            </div>
                            <div className="col-md-4">
                                <label className="headline-label col-xs-12" htmlFor="name">LANGUAGES</label>
                            </div>    
                            <div className="col-md-1">
                                <label className="headline-label col-xs-12" htmlFor="name"></label>
                            </div>  
                            <div className="col-md-1">
                                <label className="headline-label col-xs-12" htmlFor="name"></label>
                            </div>                  
                        </div>                
                    </div>
                    <div className="row row-margin">
                        <div className="col-md-6"> 
                            {talentsRendered}
                        </div>
                            <div className="col-md-6"> 
                            {languagesRendered}
                        </div>
                    </div>
                    <div className="row row-margin">
                        <div className="col-md-12"> 
                            <div className="col-md-1"> 
                            <label className="headline-label col-xs-2" htmlFor="name">NOTES</label>
                            </div>
                            <div className="col-md-12"> 
                                <textarea rows="20" className="col-xs-12" value={this.state.header.notes} onChange={e => this.onChange(e.target.value, "notes")}></textarea>
                            </div>
                        </div>
                    </div>
            </form>
        )
    }
}