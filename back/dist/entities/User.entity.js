"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Credential_entity_1 = require("./Credential.entity");
const Appointment_entity_1 = require("./Appointment.entity");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 70, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 80, unique: true, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: false }),
    __metadata("design:type", Date)
], User.prototype, "birthdate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", nullable: false, unique: true }),
    __metadata("design:type", Number)
], User.prototype, "nDni", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({}),
    __metadata("design:type", Number)
], User.prototype, "createdAT", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({}),
    __metadata("design:type", Number)
], User.prototype, "updateAT", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Credential_entity_1.Credential, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Credential_entity_1.Credential)
], User.prototype, "credential", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Appointment_entity_1.Appointment, (appointment) => appointment.user),
    __metadata("design:type", Array)
], User.prototype, "appointments", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)("users")
], User);
