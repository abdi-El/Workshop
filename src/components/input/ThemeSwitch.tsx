import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Switch } from 'antd'
import { useShallow } from 'zustand/react/shallow'
import useGlobalStore from '../../stores/GlobalStore'

export default function ThemeSwitch() {
    const isDarkTheme = useGlobalStore(
        useShallow((state) => state.settings.isDarkTheme)
    )
    const updateSettings = useGlobalStore((state) => state.updateSettings)

    function onChange(isDarkTheme: boolean) {
        updateSettings({ isDarkTheme })
    }
    return (
        <Switch
            checkedChildren={<SunOutlined />}
            unCheckedChildren={<MoonOutlined />}
            defaultChecked={isDarkTheme}
            onChange={onChange}
        />
    )
}
