// TRUCO Exportar servicios en un archivo index
// Usamos este index para exportar los servicios. Así en la app sólo hace falta el path de index.
// siendo esta la única mención en toda la app al path de los servicios exportados.
export { SettingsService} from './settings/settings.service';
export { SharedService} from './shared/shared.service';
export { SidebarService} from './shared/sidebar.service';
export { UsuarioService} from './usuario/usuario.service';
export { LoginGuardGuard } from './guards/login-guard.guard';
